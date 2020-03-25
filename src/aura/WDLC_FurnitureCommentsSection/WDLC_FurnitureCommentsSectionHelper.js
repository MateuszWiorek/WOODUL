/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    doComment: function(component, event){
        let commentAction = component.get("c.addComment");
        let richText = component.get("v.richComment");
        console.log(richText);
        commentAction.setParams({
           "rating" : component.get("v.ratingGrade"),
           "content" : component.get("v.richComment"),
           "productId" : component.get("v.product").productId
        });

        commentAction.setCallback(this, function(response){
            let state = response.getState();
            let toast = component.find("toastComponent");
            if(state === "SUCCESS"){
                toast.openInformationToast($A.get("$Label.c.WDLC_AddedComment"), "success", "Success");
            }else{
                toast.openInformationToast($A.get("$Label.c.WDLC_ErrorComment"),$A.get("$Label.c.WDL_Error"),
                $A.get("$Label.c.WDL_Error"));
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
                toast.openInformationToast($A.get("$Label.c.WDLC_ErrorComment"),$A.get("$Label.c.WDL_Error"),
                $A.get("$Label.c.WDL_Error"));
            }
        });
        $A.enqueueAction(getCommentAction);
    }
})