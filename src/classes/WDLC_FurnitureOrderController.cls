/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrderController {
    @AuraEnabled
    public static List<WDLC_ProductToOrderWrapper> getProductsToOrder() {
        return WDLC_FurnitureOrderHelper.getProductToOrder();
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
        try {
            return WDLC_FurnitureOrderHelper.addOrder(addressOrder);
        } catch (Exception e) {
            throw new WDLC_CustomException(e.getMessage());
        }
    }
    @AuraEnabled
    public static User getCurrentUserInfo() {
        User u = [
                SELECT FirstName, LastName, City, Street, State, Country, PostalCode
                FROM User
                WHERE Id = :UserInfo.getUserId()
        ];
        return u;
    }
}