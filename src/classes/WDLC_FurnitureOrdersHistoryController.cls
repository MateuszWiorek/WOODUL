/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrdersHistoryController {

    @AuraEnabled
    public static List<Order> getOrders(){
        return WDLC_FurnitureOrderHelper.getOrders();
    }
}