/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    doChangePrice : function(component, event){
        component.set("v.newPrice", component.get("v.newPrice"));
       let changePriceEvent = component.getEvent("changePrice");
       changePriceEvent.setParams({
            "productId" : component.get("v.product").productId,
            "productPrice" : component.get("v.newPrice")
       });
       changePriceEvent.fire();
    },
    doSetPrice : function(component, event){
        let params = event.getParam('arguments');
        if(params){
            let type = params.typeOfDiscount;
            let amount = params.amountOfDiscount;
            if(type === "percentage"){
                component.set("v.newPrice",component.get("v.product").productPrice - component.get("v.product").productPrice * (amount/100));
            }else if(type === "cash"){
                let standardPrice = component.get("v.product").productPrice;
                if(standardPrice > amount){
                    component.set("v.newPrice", standardPrice - amount);
                }
            }
        }
    },
    doMarkToDiscount : function(component, event){
        let markSelectedEvent = component.getEvent("markAsSelected");
        markSelectedEvent.setParams({
            "isSelected" : component.get("v.isSelected"),
            "productId" : component.get("v.product").productId,
            "productPrice" : component.get("v.newPrice")
        });
        markSelectedEvent.fire();
    }
})