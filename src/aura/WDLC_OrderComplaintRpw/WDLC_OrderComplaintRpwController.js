/**
 * Created by Mateusz Wiorek on 29.03.2020.
 */
({
    onInit: function(component, event, helper){
                let caseCommentsAction = component.get("c.getCaseComments");
                caseCommentsAction.setParams({
                    "caseId" : component.get("v.complaint").Id
                });
                caseCommentsAction.setCallback(this, function(response){
                    let state = response.getState();
                    if(state === "SUCCESS"){
                        component.set("v.caseComments", response.getReturnValue());
                    }else{
                    }
                });
                $A.enqueueAction(caseCommentsAction);
    },
    openModal : function(component){
        component.set("v.showModal", true);
    },


})