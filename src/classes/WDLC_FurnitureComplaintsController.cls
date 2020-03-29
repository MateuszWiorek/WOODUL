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
    @AuraEnabled
    public static List<CaseComment> getCaseComments(String caseId) {
        return [
                SELECT Id, CommentBody, CreatedDate, CreatedById, ParentId
                FROM CaseComment
                WHERE ParentId = :caseId
                ORDER BY CreatedDate ASC
        ];
    }
    @AuraEnabled
    public static void postCommentToCase(String caseId, String bodyComment) {
        CaseComment cc = new CaseComment();
        cc.ParentId = caseId;
        cc.IsPublished = true;
        cc.CommentBody = bodyComment;
        try {
            insert cc;
        } catch (DmlException e) {
            throw new WDLC_CustomException(Label.WDLC_ErrorComment);
        }
    }
    @AuraEnabled
    public static List<Case> getCases() {
        return [
                SELECT Status, CreatedDate, CreatedById, ProductCase__c, Reason, SuppliedEmail, Subject, Description
                FROM Case
                WHERE Reason = 'Complaint' AND CreatedById = :UserInfo.getUserId()
        ];
    }
}