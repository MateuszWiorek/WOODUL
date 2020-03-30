/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrdersHistoryController {

    @AuraEnabled
    public static List<Order> getOrders(){
        return WDLC_FurnitureOrderHelper.getOrders();
    }
    @AuraEnabled
    public static Boolean addComplaint(String productName, String subject, String description){
        try {
            return WDLC_FurnitureComplaintsController.createComplaint(productName, subject, description);
        }catch (Exception e){
            throw new WDLC_CustomException(e.getMessage());
        }
    }
}