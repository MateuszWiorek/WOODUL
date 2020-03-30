/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public with sharing class WDLC_FurnitureComplaintsController {
    @AuraEnabled
    public static Boolean createComplaint(String productName, String subject, String description) {
        return WDLC_FurnitureComplaintsHelper.createComplaint(productName,subject,description);
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