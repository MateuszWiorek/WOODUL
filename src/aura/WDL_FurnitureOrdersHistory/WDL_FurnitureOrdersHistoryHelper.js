/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doOnInit : function(component, event){
        let getOrdersAction = component.get("c.getOrders");
        getOrdersAction.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.orders", response.getReturnValue());
                console.log(response.getReturnValue());
            }
        });
        $A.enqueueAction(getOrdersAction);
    }
})