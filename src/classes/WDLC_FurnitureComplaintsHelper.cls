/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public with sharing class WDLC_FurnitureComplaintsHelper {

    public static Boolean makeComplaint(String productId, String subject, String description){
        Order__c orderCustomSettings = Order__c.getInstance('WDLCOrder');
        if(orderCustomSettings == null){
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
        Case newCase = new Case(Status = 'New', Origin='Web', Priority='Medium',
                AccountId = orderCustomSettings.AccountId__c);
        newCase.ProductId=productId;
        newCase.Subject=subject;
        newCase.Description=description;
        newCase.Reason = 'Complaint';
        try{
            Database.insert(newCase);
            return true;
        }catch (DmlException e){
            throw new WDLC_CustomException(Label.WDLC_CaseError);
        }
    }
}