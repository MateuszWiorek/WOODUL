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
        let getIdAction = component.get("c.getCurrentUserId");
        getIdAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                 component.set("v.userId", response.getReturnValue());
            }
        });
        $A.enqueueAction(getIdAction);
    },

    notifyUser: function(component,event){
        let message = JSON.parse(JSON.stringify(event.getParam('data')));
        let userIdFromEvent = message.payload.UserId__c;
        let currentUserId = component.get("v.userId");
        if(userIdFromEvent == currentUserId){
            let refreshComments = $A.get('e.c:WDLC_ResfreshCaseCommentsEvent');
            refreshComments.setParams({
                "caseID" : message.payload.CaseId__c
            });
            refreshComments.fire();
        }
    }
})