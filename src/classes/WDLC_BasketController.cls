/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_BasketController {
    @AuraEnabled
    public static void addProductToBasket(String id){
        WDLC_BasketHelper.addProductToBasket(id);
    }
    @AuraEnabled
    public static List<WDLC_ProductToOrderWrapper> getProductsInBasket(){
        return WDLC_BasketHelper.getProductsInBasket();
    }
    @AuraEnabled
    public static WDLC_ProductToOrderWrapper increaseProductCounter(String id){
        return WDLC_BasketHelper.increaseProductCounter(id);
    }
    @AuraEnabled
    public static WDLC_ProductToOrderWrapper decreaseProductCounter(String id){
        return WDLC_BasketHelper.decreaseProductCounter(id);
    }
    @AuraEnabled
    public static void removeProduct(String id){
        WDLC_BasketHelper.removeProduct(id);
    }
}