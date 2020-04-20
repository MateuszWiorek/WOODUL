/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */

public with sharing class WDLC_ProductHelper {
    public static List<WDLC_ProductWrapper> findProducts(String name) {
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        String query = 'SELECT Name, ProductCode, Description, photoUrl__c ' +
                'FROM Product2 ' +
                'WHERE Name LIKE \'%' + name + '%\' AND' +
                ' recordtypeid in (SELECT Id' +
                ' FROM RecordType where sobjecttype = \'Product2\' and name = \'Furniture\')';
        List<Product2> products = Database.query(query);

        Set<Id> productsIds = new Set<Id>();
        for (Product2 prod : products) {
            productsIds.add(prod.Id);
        }

        return getProductsWithIdIn(productsIds);
    }
    public static List<WDLC_ProductWrapper> getSimilarProducts(String productId) {
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        Product2 prod2 = [SELECT Id, Name FROM Product2 WHERE Id = :productId];
        List<String> productNames = prod2.Name.split(' ');
        String query = 'SELECT Id, Name, Description, photoUrl__c, ProductCode FROM Product2' +
                ' WHERE Name LIKE \'%' + productNames.get(0) + '%\'' +
                (productNames.size() > 1 ? ' OR Name LIKE \'%' + productNames.get(1) + '%\'' : '');

        List<Product2> similarProducts = Database.query(query);
        Set<Id> productsIds = new Set<Id>();
        for (Product2 prod : similarProducts) {
            productsIds.add(prod.Id);
        }
        return getProductsWithIdIn(productsIds);
    }
    public static List<WDLC_ProductWrapper> getWishlistedProducts() {
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();

        Set<Id> wishlistedIds = getWishlistedIds();

        return getProductsWithIdIn(wishlistedIds);
    }
    public static WDLC_ProductWrapper getProduct(String productId) {
        Set<Id> productIds = new Set<Id>{
                productId
        };
        return getProductsWithIdIn(productIds).get(0);
    }
    private static List<WDLC_ProductWrapper> getProductsWithIdIn(Set<Id> productIds) {
        Map<String, List<Decimal>> productsWithPrices = new Map<String, List<Decimal>>();
        List<Product2> products = [
                SELECT Name, Description, photoUrl__c, ProductCode, StockKeepingUnit, QuantityUnitOfMeasure
                FROM Product2
                WHERE Id IN :productIds
        ];
        List<AggregateResult> pricebookEntries = [
                SELECT Pricebook2Id, Product2Id, MIN(UnitPrice) minimalPrice, MAX(UnitPrice) maximalPrice
                FROM PricebookEntry
                WHERE Product2Id IN
                        :productIds AND Pricebook2Id IN (
                        SELECT Id
                        FROM Pricebook2
                        WHERE StartDate__c <= :System.today() AND EndDate__c >= :System.today()
                )
                GROUP BY Pricebook2Id, Product2Id
        ];
        for (AggregateResult entry : pricebookEntries) {
            if (productsWithPrices.get((String) entry.get('Product2Id')) == null) {
                productsWithPrices.put((String) entry.get('Product2Id'), new List<Decimal>{
                        (Decimal) entry.get('minimalPrice'), (Decimal) entry.get('maximalPrice')
                });
            } else {
                productsWithPrices.get((String) entry.get('Product2Id')).add((Decimal) entry.get('minimalPrice'));
                productsWithPrices.get((String) entry.get('Product2Id')).add((Decimal) entry.get('maximalPrice'));
                productsWithPrices.put((String) entry.get('Product2Id'), productsWithPrices.get((String) entry.get('Product2Id')));
            }
        }
        return wrapProduct(products, productsWithPrices);
    }
    public static String getLowestPriceForProduct(String productId) {
        List<WDLC_ProductWrapper> productList = getProductsWithIdIn(new Set<Id>{
                productId
        });
        return productList.get(0).productPriceAfterDiscount;
    }

    public static Product2 createNewProduct2(WDLC_ProductWrapper wrappedProduct) {
        Product2 product = new Product2();
        product.Name = wrappedProduct.productName;
        product.DisplayUrl = wrappedProduct.secondPhotoUrl;
        product.photoUrl__c = wrappedProduct.productPhotoUrl;
        product.Description = wrappedProduct.productDescription;
        product.Family = wrappedProduct.productFamily;
        return null;
    }
    private static List<WDLC_ProductWrapper> wrapProduct(List<Product2> products, Map<String, List<Decimal>> pricebookEntries) {
        Set<Id> wishlistedIds = getWishlistedIds();
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        for (Product2 prod : products) {
            for (String entry : pricebookEntries.keySet()) {
                if (prod.Id == entry) {
                    pricebookEntries.get(entry).sort();
                    WDLC_ProductWrapper wrap = new WDLC_ProductWrapper(String.valueOf(prod.Id),
                            prod.Name,
                            prod.Description,
                            prod.ProductCode,
                            prod.photoUrl__c,
                            String.valueOf(pricebookEntries
                                    .get(entry)
                                    .get(pricebookEntries.get(entry).size() - 1)));
                    String.valueOf(pricebookEntries.get(entry).get(0));
                    wrap.isWishlisted = (wishlistedIds.contains(wrap.productId)) ? true : false;
                    wrap.productPriceAfterDiscount = String.valueOf(pricebookEntries.get(entry).get(0));
                    wrappedProducts.add(wrap);
                }
            }
        }
        return wrappedProducts;
    }
    private static Set<Id> getWishlistedIds() {
        List<WDLC_Wishlist__c> wishlist = [
                SELECT ProductId__c, CreatedById
                FROM WDLC_Wishlist__c
                WHERE
                        CreatedById = :UserInfo.getUserId()
        ];
        Set<Id> wishlistedIds = new Set<Id>();
        for (WDLC_Wishlist__c element : wishlist) {
            wishlistedIds.add(element.ProductId__c);
        }
        return wishlistedIds;
    }
    public static Id getPriceBookEntryId(String productId) {
        List<PricebookEntry> pricebookEntries = [
                SELECT Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :productId
                AND Pricebook2Id IN (
                        SELECT Id
                        FROM Pricebook2
                        WHERE StartDate__c <= :System.today() AND EndDate__c >= :System.today()
                )
                ORDER BY UnitPrice ASC
                LIMIT
                        1
        ];
        if (!pricebookEntries.isEmpty()) {
            return pricebookEntries.get(0).Id;
        } else {
            PricebookEntry e = [
                    SELECT Id
                    FROM PricebookEntry
                    WHERE Pricebook2Id IN (
                            SELECT Id
                            FROM PRicebook2
                            WHERE Name = 'Standard Price Book'
                    ) AND Product2Id = :productId
                    LIMIT 1
            ];
            return e.Id;
        }
    }
    public static Id getStandardPriceBookEntryId(String productId) {
        List<PricebookEntry> pricebookEntries = [
                SELECT Id
                FROM PricebookEntry
                WHERE Pricebook2Id IN (
                        SELECT Id
                        FROM PRicebook2
                        WHERE Name = 'Standard Price Book'
                ) AND Product2Id = :productId
                LIMIT 1
        ];
        return pricebookEntries.get(0).Id;
    }
}