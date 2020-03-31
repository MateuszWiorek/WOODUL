/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
    onInit: function(component, event){
        const pes = component.find('peService');
        pes.subscribe(component.get("v.channel"),function(callback){
         if(callback != true){
             console.log('not subscribed to channel');
         }
        });
    },

    notifyUser: function(component,event){
        let message = JSON.parse(JSON.stringify(event.getParam('data')));
        let refreshComments = $A.get('e.c:WDLC_ResfreshCaseCommentsEvent');
        refreshComments.setParams({
            "caseID" : message.payload.CaseId__c
        });
        refreshComments.fire();
    }
})