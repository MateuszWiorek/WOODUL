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
        let pes = component.find('peService');
        pes.subscribe("WDLC_NewCaseComment__e",function(){
            console.log('subscribed');
        })
    },
    postComment : function(component, event, helper){
        let postAction = component.get("c.postCommentToCase");
        postAction.setParams({
            "caseId" : component.get("v.complaint").Id,
            "bodyComment" : component.get("v.caseCommentMessage")
        });
        postAction.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                let caseCommentsAction = component.get("c.getCaseComments");
                caseCommentsAction.setParams({
                    "caseId" : component.get("v.complaint").Id
                });
                caseCommentsAction.setCallback(this, function(response){
                    let state = response.getState();
                    if(state === "SUCCESS"){
                        component.set("v.caseComments", response.getReturnValue());
                        component.set("v.caseCommentMessage","");
                    }else{
                    }
                });
                $A.enqueueAction(caseCommentsAction);
            }
        });
        $A.enqueueAction(postAction);
    },
    closeModal : function(component, event){
        component.set("v.showModal",false);
    },


})