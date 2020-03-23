/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    doComment: function(component, event){
        let commentAction = component.get("c.addComment")
        commentAction.setParams({
           "rating" : component.get("v.rating"),
           "commentMessage" : component.get("v.richComment"),
           "productId" : component.get("v.product.productId")
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
        let pr = component.get("v.product");
//        let prId = pr.productId;
        getCommentAction.setParams({
            "productId" : "01t5J000000FuOoQAK"
        });
        getCommentAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.comments", response.getReturnValue());
                console.log(response.getReturnValue());
                component.set("v.canBeShown", true);
            }
        });
        $A.enqueueAction(getCommentAction);
    }
})