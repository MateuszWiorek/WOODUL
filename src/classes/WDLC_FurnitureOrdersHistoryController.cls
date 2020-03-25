/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrdersHistoryController {

    @AuraEnabled
    public static List<Order> getOrders(){
        return WDLC_FurnitureOrdersHistoryHelper.getOrders();
    }
    @AuraEnabled
    public static Boolean addComplaint(String productName, String subject, String description){
        return true;
    }
}