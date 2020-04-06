/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */

public with sharing class WDLC_DiscountManagerController {
    @AuraEnabled
    public static List<Product2> getProductsWithoutPrice() {
        List<Product2> products = [
                SELECT Id, ProductCode, Name, Description, photoUrl__c
                FROM Product2
                WHERE Id NOT IN (
                        SELECT Product2Id
                        FROM PricebookEntry
                ) AND RecordTypeId IN (
                        SELECT Id
                        FROM RecordType
                        WHERE sobjecttype = 'Product2' AND Name = 'Furniture'
                )
        ];
        return products;
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> findProducts(String name) {
        return WDLC_ProductHelper.findProducts(name);
    }
    @AuraEnabled
    public static List<WDLC_ProductWithPriceWrapper> setStandardPrices(Map<Id, Decimal> prices) {
        Pricebook2 standardPricebook = [SELECT Id FROM Pricebook2 WHERE IsStandard = true LIMIT 1];
        return setPrices(prices, standardPricebook.Id);
    }
    @AuraEnabled
    public static void createNewDiscount(String name, Date startDate, Date endDate) {
        if ((startDate > endDate) || (endDate < System.today())) {
            throw new WDLC_CustomException(Label.WDLC_EndDateError);
        }
        Pricebook2 newDiscount = new Pricebook2();
        newDiscount.StartDate__c = startDate;
        if (startDate <= System.today()) {
            newDiscount.IsActive = true;
        }
        newDiscount.EndDate__c = endDate;
        newDiscount.Name = name;
        try {
            insert newDiscount;
        } catch (DmlException e) {
            throw new WDLC_CustomException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<WDLC_ProductWithPriceWrapper> addProductsToDiscount(Map<Id, Decimal> prices, String pricebookName) {
        return setPrices(prices, getDiscount(pricebookName).Id);

    }
    @AuraEnabled
    public static Pricebook2 getDiscount(String name) {
        Pricebook2 discountPricebook = [
                SELECT Id, Name
                FROM Pricebook2
                WHERE Name = :name
                LIMIT 1
        ];
        return discountPricebook;
    }
    @AuraEnabled
    public static List<Pricebook2> getAllDiscounts() {
        return [
                SELECT Id, Name, StartDate__c, EndDate__c
                FROM Pricebook2
                WHERE IsActive = true OR StartDate__c > :System.today()
        ];
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> getProductsInDiscount(String discountId, Integer page) {
        Integer offset = 20 * (page - 1);
        List<AggregateResult> products = [
                SELECT Name, MIN(UnitPrice) minimalPrice, MAX(UnitPrice) maximalPrice, Pricebook2Id, Product2Id
                FROM PricebookEntry
                WHERE Pricebook2Id IN (
                        SELECT Id
                        FROM Pricebook2
                        WHERE Id = :discountId AND
                        StartDate__c <= :System.today() AND EndDate__c >= :System.today()
                ) AND Product2Id IN (
                        SELECT Id
                        FROM Product2
                        WHERE
                                RecordType.Name = 'Furniture'
                )
                GROUP BY Pricebook2Id, Name, Product2Id
                LIMIT 20
                OFFSET :offset
        ];
        System.debug(products);
        return convertAggregateResultsToProductWrappers(products);
    }
    private static List<WDLC_ProductWrapper> convertAggregateResultsToProductWrappers(List<AggregateResult> products) {
        Set<Id> ids = new Set<Id>();
        System.debug(products);
        for (AggregateResult ar : products) {
            ids.add((String)ar.get('Product2Id'));
        }
        System.debug(ids);
        List<Product2> products2 = [SELECT Description, photoUrl__c, Id FROM Product2 WHERE Id IN :ids];
        System.debug(products2);
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        for (AggregateResult ag : products) {
            for (Product2 pr : products2) {
                System.debug(ag);
                System.debug(pr);
                if (ag.get('Product2Id') == pr.Id) {
                    WDLC_ProductWrapper prod = new WDLC_ProductWrapper((String) ag.get('Product2Id'),
                            (String) ag.get('Name'),
                            pr.Description, '',
                            pr.photoUrl__c, String.valueOf((Decimal) ag.get('maximalPrice')));
                    prod.productPriceAfterDiscount = String.valueOf((Decimal) ag.get('minimalPrice'));
                    wrappedProducts.add(prod);
                }
            }
        }
        return wrappedProducts;
    }
    private static List<WDLC_ProductWithPriceWrapper> setPrices(Map<Id, Decimal> prices, Id pricebookId) {
        for (Id prodId : prices.keySet()) {
            if (prices.get(prodId) < 0) {
                prices.remove(prodId);
            }
        }
        List<WDLC_ProductWithPriceWrapper> wrappedProducts = new List<WDLC_ProductWithPriceWrapper>();
        List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
        for (Id key : prices.keySet()) {
            PricebookEntry pbEntry = new PricebookEntry();
            pbEntry.Pricebook2Id = pricebookId;
            pbEntry.Product2Id = key;
            pbEntry.UnitPrice = prices.get(key);
            pbEntry.UseStandardPrice = false;
            pbEntry.IsActive = true;
            pricebookEntries.add(pbEntry);
        }
        Database.SaveResult[] saveResults = Database.insert(pricebookEntries, false);
        for (Integer i = 0; i < pricebookEntries.size(); i++) {
            if (!saveResults.get(i).isSuccess()) {
                wrappedProducts.add(
                        new WDLC_ProductWithPriceWrapper(
                                String.valueOf(pricebookEntries.get(i).Product2Id),
                                0,
                                saveResults.get(i).getErrors().get(0).getMessage())
                );
            }
        }
        return wrappedProducts;
    }
}