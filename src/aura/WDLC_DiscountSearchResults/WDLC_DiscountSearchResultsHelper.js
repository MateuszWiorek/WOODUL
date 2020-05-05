/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    addProductWithPriceToMap : function(component, event){
        let mapOfProducts = component.get("v.productsToSetPrices");
        mapOfProducts[event.getParam("productId")] = event.getParam("productPrice");
        component.set("v.productsToSetPrices", mapOfProducts);
    },
    setPrices : function(component, event){
        let setPricesAction = component.get("c.setStandardPrices");
        setPricesAction.setParams({
            "prices" : component.get("v.productsToSetPrices")
        });
        setPricesAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.find("informationToast").openInformationToast($A.get("{!$Label.c.Success"),
                                                                        $A.get("{!$Label.c.Success"),
                                                                        $A.get("{!$Label.c.Success"));
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(setPricesAction);
    },
    searchItems : function(component, event){
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
    refreshMap : function(component, event){
        let mapToDiscount = component.get("v.selectedProductsToDiscountMap");
        if(event.getParam("isSelected")){
        mapToDiscount[event.getParam("productId")] = event.getParam("productPrice");
    }else{
        mapToDiscount[event.getParam("productId")] = -1;
        }
    },
})