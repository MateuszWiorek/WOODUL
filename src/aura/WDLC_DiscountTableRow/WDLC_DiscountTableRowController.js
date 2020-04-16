/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    showDiscountDetails : function(component, event, helper){
        helper.doShowDiscountDetails(component, event);
    },
    onInit : function(component, event){
        let disc = component.get("v.discount");
        let today = new Date();
        if(new Date(disc.EndDate__c) < today){
            component.set("v.status", 'closed')
        }else if(new Date(disc.StartDate__c) > today){
            component.set("v.status", 'future');
        }else{
            component.set("v.status", 'actual');
        }
    }
})