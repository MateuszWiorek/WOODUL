/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrderController {
    @AuraEnabled
    public static List<WDLC_ProductToOrderWrapper> getProductsToOrder(){
        return WDLC_FurnitureOrderHelper.getProductToOrder();
    }
    @AuraEnabled
    public static Order makeOrder(String addressOrder){
        return WDLC_FurnitureOrderHelper.addOrder(addressOrder);
    }
}