/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public with sharing class WDLC_FurnitureComplaintsController {
    @AuraEnabled
    public static Boolean createComplaint(String productName, String subject, String description) {
        Product2 prod = [SELECT Id, Name FROM Product2 WHERE Name = :productName];
        try {
            return WDLC_FurnitureComplaintsHelper.makeComplaint(prod.Id, subject, description);
        } catch (Exception e) {
            throw new WDLC_CustomException(e.getMessage());
        }
    }
}