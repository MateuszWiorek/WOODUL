/**
 * Created by Mateusz Wiorek on 06.04.2020.
 */

@IsTest
private class WDLC_DiscountManagementTest {
    @TestSetup
    private static void setup() {
        Pricebook2 testPricebook2 = new Pricebook2(Name = 'TestName',
                StartDate__c = System.today(),
                EndDate__c = System.today() + 1);
        Pricebook2 testPricebook = new Pricebook2(
                StartDate__c = System.today(),
                EndDate__c = System.today() + 1,
                IsActive = true,
                Id=Test.getStandardPricebookId());
        insert testPricebook2;
        update testPricebook;
        Product2 product = new Product2(Name = 'Test chair');
        Product2 product2 = new Product2(Name = 'Test2 chair');
        insert new List<Product2>{
                product, product2
        };
    }

    @IsTest
    private static void shouldAddDiscount() {
        List<Pricebook2> results = [SELECT Id FROM Pricebook2];
        System.assertEquals(2, results.size());
        Test.startTest();
        WDLC_DiscountManagerController.createNewDiscount('NameTest', System.today(), System.today() + 1);
        try {
            WDLC_DiscountManagerController.createNewDiscount('NameTest', System.today() + 1, System.today());
            WDLC_DiscountManagerController.createNewDiscount('NameTest', System.today() - 2, System.today() - 1);
        }catch (Exception e){
           System.assert(e.getMessage().contains(Label.WDLC_EndDateError));
        }
        Test.stopTest();
        results = [SELECT Id FROM Pricebook2];
        System.assertEquals(3, results.size());
    }
    @IsTest
    private static void shouldReturnOneDiscount() {
        Test.startTest();
        Pricebook2 results = WDLC_DiscountManagerController.getDiscount('TestName');
        Test.stopTest();
        System.assert(results != null);
    }
    @IsTest
    private static void shouldAddStandardPriceToItems() {
        List<Product2> products = [SELECT Id, Name FROM Product2];
        Set<Id> ids = new Set<Id>();
        for (Product2 prod : products) {
            ids.add(prod.Id);
        }
        Map<Id, Decimal> prices = new Map<Id, Decimal>();
        Integer counter = 0;
        for (Id i : ids) {
            if(counter == 0) {
                prices.put(i, 12.50);
            }else{
                prices.put(i, -3);
            }
        }
        System.debug(prices);
        List<Pricebook2> pricebook2s = [SELECT Id, Name FROM Pricebook2 WHERE IsStandard = false];
        System.debug(pricebook2s);
        Test.startTest();
        List<WDLC_ProductWithPriceWrapper> results2 = WDLC_DiscountManagerController.setStandardPrices(prices);
        List<WDLC_ProductWithPriceWrapper> results3 = WDLC_DiscountManagerController.addProductsToDiscount(prices, pricebook2s.get(0).Name);
        List<WDLC_ProductWithPriceWrapper> results = WDLC_DiscountManagerController.setPrices(prices, pricebook2s.get(0).Id);
        Test.stopTest();
        List<PricebookEntry> resultsFromEntries = [SELECT Id FROM PricebookEntry];
        System.assertEquals(4, resultsFromEntries.size());
    }

    @IsTest
    private static void shouldReturnAllDiscounts() {
        Test.startTest();
        WDLC_DiscountManagerController.getAllDiscounts();
        Test.stopTest();
        List<Pricebook2> results = [SELECT Id FROM Pricebook2];
        System.assertEquals(2, results.size());
    }
    @IsTest
    private static void shouldReturnElementsWithoutPrice(){
        System.debug([SELECT Id FROM Pricebook2 WHERE IsStandard = true LIMIT 1]);
        Test.startTest();
        List<Product2> results = WDLC_DiscountManagerController.getProductsWithoutPrice();
        Test.stopTest();
        System.assertEquals(2, results.size());
    }
    @IsTest
    private static void shouldReturnElementsInDiscount(){
        Pricebook2 standard = [SELECT Id FROM Pricebook2 WHERE IsStandard = true LIMIT 1];
        List<Product2> products = [SELECT Id FROM Product2];
        PricebookEntry pbe = new PricebookEntry();
        pbe.Pricebook2Id = standard.Id;
        pbe.Product2Id = products.get(0).Id;
        pbe.UnitPrice = 12.50;
        pbe.UseStandardPrice = false;
        pbe.IsActive = true;
        insert pbe;
        Test.startTest();
        List<WDLC_ProductWrapper> results = WDLC_DiscountManagerController.getProductsInDiscount(standard.Id, 1);
        Test.stopTest();
        System.assertEquals(1, results.size());
    }
    @IsTest
    private static void shouldReturnProducts(){
        List<Product2> products = [SELECT Id, Name FROM Product2];
        Set<Id> ids = new Set<Id>();
        for (Product2 prod : products) {
            ids.add(prod.Id);
        }
        Map<Id, Decimal> prices = new Map<Id, Decimal>();
        Integer counter = 0;
        for (Id i : ids) {
            if(counter == 0) {
                prices.put(i, 12.50);
            }else{
                prices.put(i, 11);
            }
        }
        System.debug(prices);
        List<Pricebook2> pricebook2s = [SELECT Id, Name FROM Pricebook2 WHERE IsStandard = false];
        System.debug(pricebook2s);
        Test.startTest();
        List<WDLC_ProductWithPriceWrapper> results2 = WDLC_DiscountManagerController.setStandardPrices(prices);
        List<WDLC_ProductWrapper> results = WDLC_DiscountManagerController.findProducts('Test');
        Test.stopTest();
        System.assertEquals(2, results.size());
    }
}