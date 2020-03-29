/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    handleProductId : function(component, event, helper){
        helper.doHandleProductId(component, event);
    },
    doInit : function(component, event, helper){
        let initAction = component.get("c.getProduct");
        let productUrl = decodeURIComponent(window.location.pathname.substring(1));
        let variables = productUrl.split("/");
        let productToShowId = variables[variables.length-1];
        initAction.setParams({
            "productId" : productToShowId
        });
        initAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.product", response.getReturnValue());
                component.set("v.productId", productToShowId);
            }
        });
        $A.enqueueAction(initAction);
    },
    addToCart : function(component, event, helper){
        helper.doAddToCart(component,event);
    },
    addToWishList : function(component, event, helper){
        helper.doAddToWishList(component, event);
    },
    removeFromList : function(component, event, helper){
        helper.doRemoveFromList(component, event);
    }
})