/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public with sharing class WDLC_FurnitureComplaintsController {
    @AuraEnabled
    public static Boolean createComplaint(String productName, String subject, String description, String orderId) {
        Product2 prod = [SELECT Id, Name FROM Product2 WHERE Name = :productName];
        try {
            return WDLC_FurnitureComplaintsHelper.makeComplaint(prod.Id, subject, description, orderId);
        } catch (Exception e) {
            throw new WDLC_CustomException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<CaseComment> getCaseComments(String caseId) {
        return WDLC_FurnitureComplaintsHelper.getCaseComments(caseId);
    }
    @AuraEnabled
    public static void postCommentToCase(String caseId, String bodyComment) {
        WDLC_FurnitureComplaintsHelper.postCommentToCase(caseId, bodyComment);
    }
    @AuraEnabled
    public static List<Case> getCases() {
        return WDLC_FurnitureComplaintsHelper.getCases();
    }
}