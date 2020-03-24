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
            if(state === "SUCCESS"){
            }else{
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
            }
        });
        $A.enqueueAction(getCommentAction);
    }
})