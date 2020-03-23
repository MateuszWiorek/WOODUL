/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    doComment: function(component, event){
        let commentAction = component.get("c.addComment")
        commentAction.setParams({
           "rating" : component.get("v.rating"),
           "commentMessage" : component.get("v.richComment"),
           "productId" : "01t5J000000FuOoQAK"
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
            "productId" : "01t5J000000FuOoQAK"
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