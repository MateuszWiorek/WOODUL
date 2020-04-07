/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */

public with sharing class WDLC_DiscountManagerController {
    @AuraEnabled
    public static List<Product2> getProductsWithoutPrice() {
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
    public static List<Pricebook2> getAllDiscounts() {
        return WDLC_PricebookHelper.getAllDiscounts();
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> getProductsInDiscount(String discountId, Integer page) {
        return WDLC_PricebookHelper.getProductsInDiscount(discountId, page);
    }
}