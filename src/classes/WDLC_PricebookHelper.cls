/**
 * Created by Mateusz Wiorek on 07.04.2020.
 */

public with sharing class WDLC_PricebookHelper {
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
    public static Pricebook2 getDiscount(String name) {
        List<Pricebook2> discountPricebooks = [
                SELECT Id, Name, StartDate__c, EndDate__c
                FROM Pricebook2
                WHERE Name = :name
                LIMIT 1
        ];
        if (!discountPricebooks.isEmpty()) {
            return discountPricebooks.get(0);
        } else {
            throw new WDLC_CustomException(Label.WDLC_DiscountNotExitst);
        }
    }
    public static List<Pricebook2> getAllDiscounts() {
        return [
                SELECT Id, Name, StartDate__c, EndDate__c
                FROM Pricebook2
                WHERE EndDate__c >= :System.today()
        ];
    }
    public static List<WDLC_ProductWithPriceWrapper> addProductsToDiscount(Map<Id, Decimal> prices, String pricebookName) {
        return setPrices(prices, getDiscount(pricebookName).Id);
    }
    public static List<WDLC_ProductWithPriceWrapper> setStandardPrices(Map<Id, Decimal> prices) {
        return setPrices(prices, WDLC_PricebookSettings__c.getInstance(Label.WDLC_PricebookCommunitySettings).StandardPricebookId__c);
    }
    public static List<WDLC_ProductWrapper> getProductsWithoutPrice() {
        List<Product2> products = [
                SELECT Id, ProductCode, Name, Description, photoUrl__c
                FROM Product2
                WHERE Id NOT IN (
                        SELECT Product2Id
                        FROM PricebookEntry
                ) AND RecordTypeId IN (
                        SELECT Id
                        FROM RecordType
                        WHERE SobjectType = 'Product2' AND Name = 'Furniture'
                )
        ];
        return convertFromProductToWrapper(products);
    }
    public static List<WDLC_ProductWrapper> getProductsInDiscount(String discountId, Integer page) {
        Integer offset = 20 * (page - 1);
        List<AggregateResult> products = [
                SELECT Name, MIN(UnitPrice) minimalPrice, MAX(UnitPrice) maximalPrice, Pricebook2Id, Product2Id
                FROM PricebookEntry
                WHERE Pricebook2Id IN (
                        SELECT Id
                        FROM Pricebook2
                        WHERE Id = :discountId
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
        return convertAggregateResultsToProductWrappers(products);
    }
    public static Pricebook2 editPricebook2(String pricebookId, Date startDate, Date endDate) {
        if ((startDate > endDate) || (endDate < System.today())) {
            throw new WDLC_CustomException(Label.WDLC_EndDateError);
        }
        Pricebook2 pricebook = [SELECT Name, StartDate__c, EndDate__c FROM Pricebook2 WHERE Id = :pricebookId];
        pricebook.StartDate__c = startDate;
        pricebook.EndDate__c = endDate;
        try {
            upsert pricebook;
            return pricebook;
        } catch (DmlException e) {
            throw new WDLC_CustomException(e.getMessage());
        }
    }
    public static void removeItemsFromPricebook(String pricebookId, List<String> productId) {
        List<PricebookEntry> pbEntries = [
                SELECT Product2Id, Pricebook2Id
                FROM PricebookEntry
                WHERE Product2Id IN :productId AND Pricebook2Id = :pricebookId
        ];
        if (!pbEntries.isEmpty()) {
            try {
                delete pbEntries;
            } catch (DmlException e) {
                throw new WDLC_CustomException(e.getMessage());
            }
        }
    }
    public static void editPricesInPricebook(String pricebookId, String productId, Decimal newUnitPrice) {
        List<PricebookEntry> pbEntries = [
                SELECT Product2Id, Pricebook2Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :productId AND Pricebook2Id = :pricebookId
                LIMIT 1
        ];
        System.debug(pbEntries);
        if (!pbEntries.isEmpty()) {
            pbEntries.get(0).UnitPrice = newUnitPrice;
            try {
                upsert(pbEntries);
            } catch (DmlException e) {
                System.debug(e.getMessage());
                throw new WDLC_CustomException(e.getMessage());
            }
        }
    }
    public static List<WDLC_ProductWrapper> findProductsWithIds(List<String> ids, String discountName) {
        String discountId = getDiscount(discountName).Id;
        List<AggregateResult> prods = [
                SELECT Name, MIN(UnitPrice) minimalPrice, MAX(UnitPrice) maximalPrice, Pricebook2Id, Product2Id
                FROM PricebookEntry
                WHERE Pricebook2Id IN (
                        SELECT Id
                        FROM Pricebook2
                        WHERE Id = :discountId OR Name = :Label.WDLC_StandardPricebook
                ) AND Product2Id IN (
                        SELECT Id
                        FROM Product2
                        WHERE
                        RecordType.Name = 'Furniture' AND Id IN :ids
                )
                GROUP BY Pricebook2Id, Name, Product2Id
        ];
        return convertAggregateResultsToProductWrappers(prods);
    }
    private static List<WDLC_ProductWrapper> convertFromProductToWrapper(List<Product2> products){
        List<WDLC_ProductWrapper> wrappers = new List<WDLC_ProductWrapper>();
        for(Product2 pr : products){
            wrappers.add(new WDLC_ProductWrapper(pr.Id, pr.Name, pr.Description, '','',''));
        }
        return wrappers;
    }
    private static List<WDLC_ProductWrapper> convertAggregateResultsToProductWrappers(List<AggregateResult> products) {
        Set<Id> ids = new Set<Id>();
        for (AggregateResult ar : products) {
            ids.add((String) ar.get('Product2Id'));
        }
        Map<Id, Decimal> standardPrices = new Map<Id, Decimal>();
        List<PricebookEntry> pbs = [
                SELECT Product2Id,UnitPrice
                FROM PricebookEntry
                WHERE Product2Id IN :ids AND Pricebook2Id IN (
                        SELECT
                                Id
                        FROM Pricebook2
                        WHERE Name = :Label.WDLC_StandardPricebook
                )
        ];
        for (PricebookEntry pb : pbs) {
            standardPrices.put(pb.Product2Id, pb.UnitPrice);
        }
        List<Product2> products2 = [SELECT Description, photoUrl__c, Id FROM Product2 WHERE Id IN :ids];
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        for (AggregateResult ag : products) {
            for (Product2 pr : products2) {
                if (ag.get('Product2Id') == pr.Id && !isProductInList(pr.Id, wrappedProducts)) {
                    WDLC_ProductWrapper prod = new WDLC_ProductWrapper((String) ag.get('Product2Id'),
                            (String) ag.get('Name'),
                            pr.Description, '',
                            pr.photoUrl__c, String.valueOf(standardPrices.get(pr.Id)));
                    prod.productPriceAfterDiscount = String.valueOf((Decimal) ag.get('minimalPrice'));
                    prod.discountAmount = String.valueOf(standardPrices.get(pr.Id) - (Decimal) ag.get('maximalPrice'));
                    wrappedProducts.add(prod);
                }
            }
        }
        System.debug(wrappedProducts);
        return wrappedProducts;
    }
    private static Boolean isProductInList(String productId, List<WDLC_ProductWrapper> wrappedProducts){
        for(WDLC_ProductWrapper pr : wrappedProducts){
            if(productId == pr.productId){
                return true;
            }
        }
        return false;
    }
    public static List<WDLC_ProductWithPriceWrapper> setPrices(Map<Id, Decimal> prices, Id pricebookId) {
        List<WDLC_ProductWithPriceWrapper> wrappedProducts = new List<WDLC_ProductWithPriceWrapper>();
        List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
        for (Id prodId : prices.keySet()) {
            if (prices.get(prodId) < 0) {
                prices.remove(prodId);
            }
        }
        List<PricebookEntry> actualPricebookEntries = [
                SELECT Pricebook2Id, Product2Id, UnitPrice
                FROM
                        PricebookEntry
                WHERE Pricebook2Id = :pricebookId AND Product2Id IN :prices.keySet()
        ];
        for(String productId : prices.keySet()){
            for(PricebookEntry pb :actualPricebookEntries){
                if(productId == pb.Product2Id){
                    pb.UnitPrice = prices.get(productId);
                    pricebookEntries.add(pb);
                    prices.remove(productId);
                }
            }
        }

        for (Id key : prices.keySet()) {
            PricebookEntry pbEntry = new PricebookEntry();
            pbEntry.Pricebook2Id = pricebookId;
            pbEntry.Product2Id = key;
            pbEntry.UnitPrice = prices.get(key);
            pbEntry.UseStandardPrice = false;
            pbEntry.IsActive = true;
            pricebookEntries.add(pbEntry);
        }
        Database.UpsertResult[] saveResults = Database.upsert(pricebookEntries, false);
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
    public static Boolean isPricebookActive(String name) {
        List<Pricebook2> pb = [SELECT StartDate__c, EndDate__c FROM Pricebook2 WHERE Name = :name LIMIT 1];
        if (!pb.isEmpty()) {
            if (pb[0].StartDate__c <= System.today() && pb[0].EndDate__c >= System.today()) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}