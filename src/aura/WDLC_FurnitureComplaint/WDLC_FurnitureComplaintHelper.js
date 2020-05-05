/**
 * Created by Mateusz Wiorek on 26.03.2020.
 */
({
    onInit : function(component, event){
        let sPageURL = decodeURIComponent(window.location.href.substring(0));
        let sURLVariables = sPageURL.split('/');
        let caseIdR = sURLVariables[sURLVariables.length-2];
        component.set("v.caseDetail", sURLVariables[sURLVariables.length-2]);
        let caseCommentsAction = component.get("c.getCaseComments");
        caseCommentsAction.setParams({
            "caseId" : component.get("v.caseDetail")
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
    postComment : function(component, event){
        let postAction = component.get("c.postCommentToCase");
        postAction.setParams({
            "caseId" : component.get("v.caseDetail"),
            "bodyComment" : component.get("v.caseCommentMessage")
        });
        postAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.caseCommentMessage","");
            }else{
            }
        });
        $A.enqueueAction(postAction);
    }
})