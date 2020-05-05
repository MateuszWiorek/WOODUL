/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doOnInit : function(component, event){
        let getListAction = component.get("c.getProductsToOrder");
               getListAction.setCallback(this,function(response){
                   let state = response.getState();
                   if(state === "SUCCESS"){
                       let total = 0;
                       let products = response.getReturnValue();
                       for(let i = 0; i<products.length; i++){
                           total +=products[i].totalCost;
                       }
                       component.set("v.totalPrice", total);
                       component.set("v.productsToOrder", products);
                   }else{
                   }
               });
               let getUserInfoAction = component.get("c.getCurrentUserInfo");
               getUserInfoAction.setCallback(this, function(response){
                   let state = response.getState();
                   if(state === "SUCCESS"){
                       let userI = response.getReturnValue();
                       component.set("v.billingCountry", userI.Country);
                       component.set("v.billingCity", userI.City);
                       component.set("v.billingState", userI.State);
                       component.set("v.billingPostalCode", userI.PostalCode);
                       component.set("v.billingStreet", userI.Street);
                    }else{
                        toast.openInformationToast(response.getError()[0].message, $A.get("$Label.c.WDL_Error"),
                         $A.get("$Label.c.WDL_Error"));
                    }                   }
               });
               $A.enqueueAction(getUserInfoAction);
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
        let orderAction = component.get("c.makeOrder");
        orderAction.setParams({
            "addressOrder" : addressJson
        });
        orderAction.setCallback(this, function(response){
            let state = response.getState();
            let toast = component.find("toastComponent")
            if(state === "SUCCESS"){
                component.set("v.orderSummary", response.getReturnValue());
                component.set("v.showModal",true);
                toast.openInformationToast($A.get("$Label.c.WDLC_OrderSuccess"),"success","Success");
            }else{
                toast.openInformationToast(response.getError()[0].message, $A.get("$Label.c.WDL_Error"),
                 $A.get("$Label.c.WDL_Error"));
            }
        });
        $A.enqueueAction(orderAction);
    },
    doIncrementCounter : function(component, event){
        let indexOfItem = event.currentTarget.dataset.record;
        let items = component.get("v.productsToOrder")[indexOfItem];
        let incrementAction = component.get("c.increaseProductCounter");
        incrementAction.setParams({
            "productId" : idOfProduct
        });
    },
    doRefreshTable : function(component, event){
        let getItemsAction = component.get("c.getProductsToOrder");
        getItemsAction.setCallback(this,function(response){
            let state = response.getState();
            if(state==="SUCCESS"){
                 let total = 0;
                 component.set("v.productsToOrder", response.getReturnValue());
                 for(let i of response.getReturnValue()){
                    total += i.totalCost;
                 }
                 component.set("v.totalPrice", total);
            }else{
                toast.openInformationToast(response.getError()[0].message, $A.get("$Label.c.WDL_Error"),
                 $A.get("$Label.c.WDL_Error"));
            }
        });
        $A.enqueueAction(getItemsAction);
    },
    openModal : function(component){
        component.set("v.showModal", true);
    },
})