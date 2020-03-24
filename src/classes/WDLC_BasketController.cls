/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_BasketController {
    @AuraEnabled
    public static void addProductToBasket(String id){
        WDLC_BasketHelper.addProductToBasket(id);
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> getProductsInBasket(){
        return WDLC_BasketHelper.getProductsInBasket();
    }
}