/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    changePrice : function(component, event){
        component.set("v.newPrice", component.get("v.newPrice"));
       let changePriceEvent = component.getEvent("changePrice");
       changePriceEvent.setParams({
            "productId" : component.get("v.product").productId,
            "productPrice" : component.get("v.newPrice")
       });
       changePriceEvent.fire();
    },
    setPrice : function(component, event){
        let params = event.getParam('arguments');
        if(params){
            let type = params.typeOfDiscount;
            let amount = params.amountOfDiscount;
            let oldPrice = component.get("v.product").productPrice;
            if(type === "percentage"){
                component.set("v.newPrice", oldPrice - oldPrice * (amount/100));
            }else if(type === "fixed"){
                if(oldPrice > amount){
                    component.set("v.newPrice", oldPrice - amount);
                }
            }
        }
    },
    markToDiscount : function(component, event){
        let markSelectedEvent = component.getEvent("markAsSelected");
        markSelectedEvent.setParams({
            "isSelected" : component.get("v.isSelected"),
            "productId" : component.get("v.product").productId,
            "productPrice" : component.get("v.newPrice")
        });
        markSelectedEvent.fire();
    }
})