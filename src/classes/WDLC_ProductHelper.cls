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
        Set<Id> productIds = new Set<Id>{productId};
        return getProductsWithIdIn(productIds).get(0);
    }
    private static List<WDLC_ProductWrapper> getProductsWithIdIn(Set<Id> productIds){
        List<Product2> products = [
                SELECT Name, Description, photoUrl__c, ProductCode, StockKeepingUnit, QuantityUnitOfMeasure
                FROM Product2
                WHERE Id IN :productIds
        ];
        List<PricebookEntry> pricebookEntries = [
                SELECT Name, Pricebook2Id, Product2Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2Id IN
                        :productIds
        ];
        return wrapProduct(products, pricebookEntries);
    }
    private static List<WDLC_ProductWrapper> wrapProduct(List<Product2> products, List<PricebookEntry> pricebookEntries) {
        Set<Id> wishlistedIds = getWishlistedIds();
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        for (Product2 prod : products) {
            for (PricebookEntry entry : pricebookEntries) {
                if (prod.Id == entry.Product2Id) {
                    WDLC_ProductWrapper wrap = new WDLC_ProductWrapper(String.valueOf(prod.Id), prod.Name, prod.Description,
                            prod.ProductCode, prod.photoUrl__c, String.valueOf(entry.UnitPrice));
                    wrap.isWishlisted = (wishlistedIds.contains(wrap.productId)) ? true : false;
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
}