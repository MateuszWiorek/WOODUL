/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    doAddProductWithPriceToMap : function(component, event){
        console.log(event.getParam("productId"));
        console.log(event.getParam("productPrice"));

        let mapOfProducts = component.get("v.productsToSetPrices");
        mapOfProducts[event.getParam("productId")] = event.getParam("productPrice");
        component.set("v.productsToSetPrices", mapOfProducts);
        let mapp = component.get("v.productsToSetPrices");
        for(let key in mapp){
            console.log(key);
            console.log(mapp[key]);
        }
    },
    doSetPrices : function(component, event){
        let setPricesAction = component.get("c.setStandardPrices");
        setPricesAction.setParams({
            "prices" : component.get("v.productsToSetPrices")
        });
        setPricesAction.setCallback(this, function(response){
            if(response.getState() === "SUCCES"){

            }else{

            }
        });
        $A.enqueueAction(setPricesAction);
    },
    doSearchItems : function(component, event){
        let findAction = component.get("c.findProducts");
        findAction.setParams({
        "name" : event.getParam("query")
        });
        findAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.productsToDiscount", response.getReturnValue());
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(findAction);
    },
    doRefreshMap : function(component, event){
        let mapToDiscount = component.get("v.selectedProductsToDiscountMap");
        if(event.getParam("isSelected")){
        mapToDiscount[event.getParam("productId")] = event.getParam("productPrice");
    }else{
        mapToDiscount[event.getParam("productId")] = -1;
        }
    },
})