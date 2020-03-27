/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public without sharing class WDLC_FurnitureComplaintsHelper {

    public static Boolean makeComplaint(String productId, String subject, String description) {
        AssignmentRule AR = new AssignmentRule();
        AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];
        Database.DMLOptions dmlOpts = new Database.DMLOptions();
        dmlOpts.assignmentRuleHeader.assignmentRuleId = AR.id;
        Order__c orderCustomSettings = Order__c.getInstance('WDLCOrder');
        if (orderCustomSettings == null) {
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
        Case newCase = new Case(Status = 'New', Origin = 'Web', Priority = 'Medium',
                AccountId = orderCustomSettings.AccountId__c,
                Subject = subject, Description = description, Reason = 'Complaint', SuppliedEmail = UserInfo.getUserEmail());
        newCase.setOptions(dmlOpts);
        newCase.ProductCase__c = productId;
        try {
            System.debug(newCase);
            Database.insert(newCase);
            return true;
        } catch (DmlException e) {
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
    }
}