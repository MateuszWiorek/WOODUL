/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doDoInit : function(component, event){
        let getBasketAction = component.get("c.getProductsInBasket");
        getBasketAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.results", response.getReturnValue());
            }else{

            }
        });
        $A.enqueueAction(getBasketAction);
    }
})