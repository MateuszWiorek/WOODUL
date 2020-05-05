/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    changePrice : function(component, event){
        component.set("v.newPrice", component.get("v.newPrice"));
       let changePriceEvent = component.getEvent("changePrice");
       changePriceEvent.setParams({
            "productId" : component.get("v.item").productId,
            "productPrice" : component.get("v.newPrice")
       });
       changePriceEvent.fire();
    },
    setPrice : function(component, event){
        let params = event.getParam('arguments');
        if(params){
            let type = params.typeOfDiscount;
            let amount = params.amountOfDiscount;
            if(type === "percentage"){
                component.set("v.newPrice",
                component.get("v.item").productPrice - component.get("v.item").productPrice * (amount/100));
            }else if(type === "cash"){
                let standardPrice = component.get("v.item").productPrice;
                if(standardPrice > amount){
                    component.set("v.newPrice", standardPrice - amount);
                }
            }
        }
    },
    markToDiscount : function(component, event){
        let markSelectedEvent = component.getEvent("markAsSelected");
        markSelectedEvent.setParams({
            "isSelected" : component.get("v.isSelected"),
            "productId" : component.get("v.item").productId,
            "productPrice" : component.get("v.newPrice")
        });
        markSelectedEvent.fire();
    }
})