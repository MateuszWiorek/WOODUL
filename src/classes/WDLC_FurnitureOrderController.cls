/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrderController {
    @AuraEnabled
    public static List<WDLC_ProductToOrderWrapper> getProductsToOrder() {
        return WDLC_BasketController.getProductsInBasket();
    }
    @AuraEnabled
    public static WDLC_ProductToOrderWrapper increaseProductCounter(String productId){
        return WDLC_BasketController.increaseProductCounter(productId);
    }
    @AuraEnabled
    public static WDLC_ProductToOrderWrapper decreaseProductCounter(String productId){
        return WDLC_BasketController.decreaseProductCounter(productId);
    }
    @AuraEnabled
    public static void removeProductFromBasket(String productId){
        WDLC_BasketController.removeProduct(productId);
    }
    @AuraEnabled
    public static Order makeOrder(String addressOrder) {
            return WDLC_FurnitureOrderHelper.addOrder(addressOrder);
    }
    @AuraEnabled
    public static User getCurrentUserInfo() {
        return WDL_Utils.getCurrentUserInfo();
    }
    @AuraEnabled
    public static WDLC_ProductToOrderWrapper changeCounter(String id, Integer newValue){
        return WDLC_BasketController.changeProductCounter(id, newValue);
    }
}