/**
 * Created by Mateusz Wiorek on 03.04.2020.
 */

global with sharing class WDLC_DiscountRunningControllerBatch implements Database.Batchable<SObject>, Schedulable {
    global Database.QueryLocator start(Database.BatchableContext bc){
        String query = 'SELECT IsActive, StartDate__c, EndDate__c FROM Pricebook2 WHERE EndDate__c >=' +System.today();
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext bc, List<Pricebook2> pricebooks){
        for(Pricebook2 pricebook : pricebooks){
            if(pricebook.IsActive){
                if(pricebook.EndDate__c == System.today()){
                    pricebook.IsActive = false;
                }
            }else{
                if(pricebook.StartDate__c == System.today()){
                    pricebook.IsActive = true;
                }
            }
        }
    }
    global void finish(Database.BatchableContext bc){
    }
    global void execute(SchedulableContext sc){
        WDLC_DiscountRunningControllerBatch batch = new WDLC_DiscountRunningControllerBatch();
        Database.executeBatch(batch);
    }
}