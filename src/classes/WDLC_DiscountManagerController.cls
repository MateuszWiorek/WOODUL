/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */

public with sharing class WDLC_DiscountManagerController {
    @AuraEnabled
    public static List<WDLC_ProductWrapper> getProductsWithoutPrice() {
        return WDLC_PricebookHelper.getProductsWithoutPrice();
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> findProducts(String name) {
        return WDLC_ProductHelper.findProducts(name);
    }
    @AuraEnabled
    public static List<WDLC_ProductWithPriceWrapper> setStandardPrices(Map<Id, Decimal> prices) {
        return WDLC_PricebookHelper.setStandardPrices(prices);
    }
    @AuraEnabled
    public static void createNewDiscount(String name, Date startDate, Date endDate) {
        WDLC_PricebookHelper.createNewDiscount(name, startDate, endDate);
    }
    @AuraEnabled
    public static List<WDLC_ProductWithPriceWrapper> addProductsToDiscount(Map<Id, Decimal> prices, String pricebookName) {
        return WDLC_PricebookHelper.addProductsToDiscount(prices, pricebookName);
    }
    @AuraEnabled
    public static Pricebook2 getDiscount(String name) {
        return WDLC_PricebookHelper.getDiscount(name);
    }
    @AuraEnabled
    public static Id getDiscountId(String name) {
        return WDLC_PricebookHelper.getDiscount(name).Id;
    }
    @AuraEnabled
    public static List<Pricebook2> getAllDiscounts() {
        return WDLC_PricebookHelper.getAllDiscounts();
    }
    @AuraEnabled
    public static List<Pricebook2> getDiscounts() {
        return [SELECT Name, StartDate__c, EndDate__c FROM Pricebook2];
    }
    @AuraEnabled (cacheable=true)
    public static List<WDLC_ProductWrapper> getProductsInDiscount(String discountId, Integer page) {
        return WDLC_PricebookHelper.getProductsInDiscount(discountId, page);
    }
    @AuraEnabled
    public static Pricebook2 editPricebook(String pricebookId, Date startDate, Date endDate) {
        return WDLC_PricebookHelper.editPricebook2(pricebookId, startDate, endDate);
    }
    @AuraEnabled
    public static void deleteDiscount(String name) {
        delete WDLC_PricebookHelper.getDiscount(name);
    }
    @AuraEnabled
    public static void removeItemsFromPricebook(String pricebookId, List<Id> productsId) {
        WDLC_PricebookHelper.removeItemsFromPricebook(pricebookId, productsId);
    }
    @AuraEnabled
    public static List<Pricebook2> findPricebooks(String name) {
        String queryName = '%' + name + '%';
        return [SELECT Name, StartDate__c, EndDate__c FROM Pricebook2 WHERE Name LIKE :queryName];
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> findProductsWithIds(List<String> ids, String discountName) {
        return WDLC_PricebookHelper.findProductsWithIds(ids, discountName);
    }
    @AuraEnabled
    public static String getDiscountDates(String name){
        Pricebook2 pb = WDLC_PricebookHelper.getDiscount(name);
        return '(' + String.valueOf(pb.StartDate__c).replace('-','/') +'-'+String.valueOf(pb.EndDate__c).replace('-','/')+')';
    }
    @AuraEnabled
    public static Boolean isPricebookActive(String name) {
        return WDLC_PricebookHelper.isPricebookActive(name);
    }
}