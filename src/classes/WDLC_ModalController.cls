/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */

public with sharing class WDLC_ModalController {
    @AuraEnabled
    public static void postCommentToCase(String caseId, String bodyComment) {
        WDLC_FurnitureComplaintsHelper.postCommentToCase(caseId, bodyComment);
    }
    @AuraEnabled
    public static Boolean addComplaint(String productName, String subject, String description, String orderId){
        try {
            return WDLC_FurnitureComplaintsController.createComplaint(productName, subject, description, orderId);
        }catch (Exception e){
            throw new WDLC_CustomException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<CaseComment> getCaseComments(String caseId) {
        return WDLC_FurnitureComplaintsHelper.getCaseComments(caseId);
    }
}