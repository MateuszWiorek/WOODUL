/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    doIncrementCounter : function(component, event){
        let idOfProduct = component.get("v.cell").product.productId;
        let incrementAction = component.get("c.increaseProductCounter");
        incrementAction.setParams({
            "productId" : idOfProduct
        });
        incrementAction.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.cell", response.getReturnValue());
                let refreshEvent = component.getEvent("changeEvent");
                refreshEvent.fire();
            }
        });
        $A.enqueueAction(incrementAction);
    },
    doDecrementCounter : function(component, event){
        let idOfProduct = component.get("v.cell").product.productId;
        let incrementAction = component.get("c.decreaseProductCounter");
        incrementAction.setParams({
            "productId" : idOfProduct
        });
        incrementAction.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.cell", response.getReturnValue());
                let refreshEvent = component.getEvent("changeEvent");
                refreshEvent.fire();
            }
        });
        $A.enqueueAction(incrementAction);
    },
    doRemoveProduct : function(component, event){
        let idOfProduct = component.get("v.cell").product.productId;
        let removeAction = component.get("c.removeProductFromBasket");
        removeAction.setParams({
            "productId" : idOfProduct
        });
        removeAction.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let refreshEvent = component.getEvent("changeEvent");
                refreshEvent.fire();
            }else{
                console.log('error');
                console.log(response.getError()[0]);
            }
        });
        $A.enqueueAction(removeAction);
    },
    doChangeProductCounter : function(component,event){
        let changeCounterAction = component.get("c.changeCounter");
        changeCounterAction.setParams({
            "id" : component.get("v.cell").product.productId,
            "newValue" : component.get("v.cell").quantity
        });
        changeCounterAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let refreshEvent = component.getEvent("changeEvent");
                refreshEvent.fire();
            }else{
                console.log('error');
                console.log(response.getError()[0]);
            }
        });
        $A.enqueueAction(changeCounterAction);
    }
})