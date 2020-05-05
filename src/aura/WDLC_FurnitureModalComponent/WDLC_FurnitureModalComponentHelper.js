/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */
({
    sendDataToCase : function(component, event){
        let createCaseAction = component.get("c.createComplaint");
        createCaseAction.setParams({
            "productName" : component.get("v.product"),
            "subject" : component.get("v.subject"),
            "description" : component.get("v.description"),
            "orderId" : component.get("v.order").Id
        });

        createCaseAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let toast = component.find("toastComponent");
                if(response.getReturnValue() == true){
                    toast.openInformationToast($A.get("{!$Label.c.WDLC_ComplaintSuccesSend}"),
                                                $A.get("{!$Label.c.Success}"), $A.get("{!$Label.c.Success}"));
                }else{
                    toast.openInformationToast($A.get("{!$Label.c.WDLC_ComplaintErrorSending}")
                            , $A.get("{!$Label.c.Error}"), $A.get("{!$Label.c.Error}"));
                }
                    component.set("v.showModal", false);
            }else{
                component.find("errorToast").showError(response);
            }
        });

        $A.enqueueAction(createCaseAction);
    },
    postComment : function(component, event){
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
                        component.find("errorToast").showError(response);
                    }
                });
                $A.enqueueAction(caseCommentsAction);
            }
        });
        $A.enqueueAction(postAction);
    },
    refreshComments : function(component, event){
         let caseCommentsAction = component.get("c.getCaseComments");
         caseCommentsAction.setParams({
              "caseId" : component.get("v.complaint").Id
         });
         caseCommentsAction.setCallback(this, function(response){
             let state = response.getState();
             if(state === "SUCCESS"){
                    component.set("v.caseComments", response.getReturnValue());
             }else{
                 component.find("errorToast").showError(response);
             }
          });
          $A.enqueueAction(caseCommentsAction);
     },
})