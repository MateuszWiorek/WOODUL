/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doOnInit : function(component, event){
        let getListAction = component.get("c.getProductsToOrder");
        getListAction.setCallback(this,function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.productsToOrder", response.getReturnValue());
            }else{
                //toast will be here
            }
        });
        $A.enqueueAction(getListAction);
    },
    doMakeOrder : function(component, event){
        let street = component.get("v.billingStreet");
        let postalCode = component.get("v.billingPostalCode");
        let state = component.get("v.billingState");
        let country = component.get("v.billingCountry");
        let city = component.get("v.billingCity");
        let address = {
            billingStreet : street,
            billingPostalCode : postalCode,
            billingState : state,
            billingCountry : country,
            billingCity : city
        };
            let addressJson = JSON.stringify(address);
            console.log(addressJson);
        let orderAction = component.get("c.makeOrder");
        orderAction.setParams({
            "addressOrder" : addressJson
        });
        orderAction.setCallback(this, function(response){
            let state = response.getState();
            let toast = component.find("toastComponent")
            if(state === "SUCCESS"){
                toast.openInformationToast($A.get("$Label.c.WDLC_OrderSuccess"),"success","Success");
            }else{
                console.log(response.getError()[0]);
                toast.openInformationToast(response.getError()[0].message, $A.get("$Label.c.WDL_Error"),
                 $A.get("$Label.c.WDL_Error"));
            }
        });
        $A.enqueueAction(orderAction);
    }
})