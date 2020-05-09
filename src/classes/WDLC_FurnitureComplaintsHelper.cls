/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public without sharing class WDLC_FurnitureComplaintsHelper {

    public static Boolean makeComplaint(String productId, String subject, String description, String orderId) {

        AssignmentRule assignmentRule = new AssignmentRule();
        assignmentRule = [SELECT Id FROM AssignmentRule WHERE SobjectType = 'Case' AND Active = true LIMIT 1];
        Database.DMLOptions dmlOpts = new Database.DMLOptions();
        dmlOpts.assignmentRuleHeader.assignmentRuleId = assignmentRule.id;
        Order__c orderCustomSettings = Order__c.getInstance(Label.WDLC_OrderCommunitySettings);
        WDLC_CaseSettings__c caseSetting = WDLC_CaseSettings__c.getInstance(Label.WDLC_CommunityOrderComplaintSettings);
        if (orderCustomSettings == null || caseSetting == null) {
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
        Case newCase = new Case(Status = caseSetting.Status__c,
                Origin = caseSetting.Origin__c, Priority = caseSetting.Priority__c,
                AccountId = orderCustomSettings.AccountId__c,
                Subject = subject, Description = description,
                Reason = caseSetting.Reason__c, SuppliedEmail = UserInfo.getUserEmail());
        newCase.setOptions(dmlOpts);
        newCase.ProductCase__c = productId;
        newCase.OrderCase__c = orderId;
        try {
            Database.insert(newCase);
            return true;
        } catch (DmlException e) {
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
    }
    public static List<CaseComment> getCaseComments(String caseId) {
        return [
                SELECT Id, CommentBody, CreatedDate, CreatedById, ParentId
                FROM CaseComment
                WHERE ParentId = :caseId
                ORDER BY CreatedDate ASC
        ];
    }
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
    public static List<Case> getCases() {
        WDLC_CaseSettings__c caseSetting = WDLC_CaseSettings__c.getInstance(Label.WDLC_CommunityOrderComplaintSettings);
        if (caseSetting == null) {
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
        return [
                SELECT Status, CaseNumber, CreatedDate, CreatedById, ProductCase__c, Reason, SuppliedEmail, Subject, Description
                FROM Case
                WHERE Reason = :caseSetting.Reason__c AND CreatedById = :UserInfo.getUserId()
        ];
    }
}