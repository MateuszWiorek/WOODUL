/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */
({
    doSendDataToCase : function(component, event){
        let createCaseAction = component.get("c.addComplaint");
        let prodName = component.get("v.product");
        let sub = component.get("v.subject");
        let desc = component.get("v.description");
        createCaseAction.setParams({
            "productName" : prodName,
            "subject" : sub,
            "description" : desc
        });

        createCaseAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                console.log(response);
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
                let toast = component.find("toastComponent");
                toast.openInformationToast(response.getError()[0], $A.get("{!$Label.c.Error}"), $A.get("{!$Label.c.Error}"));
            }
        });

        $A.enqueueAction(createCaseAction);
    },
    doPostComment : function(component, event){
        console.log('dupa');
        let postAction = component.get("c.postCommentToCase");
                console.log(component.get("v.caseCommentMessage"));
                console.log(component.get("v.complaint").Id);
        postAction.setParams({
            "caseId" : component.get("v.complaint").Id,
            "bodyComment" : component.get("v.caseCommentMessage")
        });
        console.log(component.get("v.caseCommentMessage"));
        console.log(component.get("v.complaint").Id);
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
             }
          });
          $A.enqueueAction(caseCommentsAction);
     },
})