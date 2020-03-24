/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    handleProductId : function(component, event, helper){
        helper.doHandleProductId(component, event);
    },
    doInit : function(component, event, helper){
        let initAction = component.get("c.getProduct");
        initAction.setParams({
            "productId" : component.get("v.productId")
        });
        initAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.product", response.getReturnValue());
            }
        });
        $A.enqueueAction(initAction);
    },
    addToCart : function(component, event, helper){
        helper.doAddToCart(component,event);
    }
})