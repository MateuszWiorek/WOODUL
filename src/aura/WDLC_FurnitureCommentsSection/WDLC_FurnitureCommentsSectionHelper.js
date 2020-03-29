/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    doComment: function(component, event){
        let commentAction = component.get("c.addComment");
        commentAction.setParams({
           "rating" : component.get("v.ratingGrade"),
           "content" : component.get("v.richComment"),
           "productId" : component.get("v.product").productId
        });

        commentAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.find("toastComponent").openInformationToast($A.get("$Label.c.WDLC_AddedComment"),
                 $A.get("$Label.c.Success"), $A.get("$Label.c.Success"));
                 component.set("v.ratingGrade", 0);
                 component.set("v.richComment", '');
            }else{
                component.find("errorComponent").openErrorToast(response);
            }
        });
        $A.enqueueAction(commentAction);
    },
    doInit : function(component, event){
        let getCommentAction = component.get("c.getComments");
        getCommentAction.setParams({
            "productId" : component.get("v.product").productId
        });
        getCommentAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.comments", response.getReturnValue());
            }else{
                let toast = component.find("toastComponent");
                component.find("errorComponent").openErrorToast(response);
            }
        });
        $A.enqueueAction(getCommentAction);
    }
})