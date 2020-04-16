/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    doOnInit: function(component, event){
        console.log('cc');
        let initAction = component.get("c.getProductsWithoutPrice");
        initAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
            component.set("v.productsWithoutPrice", response.getReturnValue());
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(initAction);
    },
    doAddProductWithPriceToMap : function(component, event){
        let mapOfProducts = component.get("v.productsToSetPrices");
        mapOfProducts[event.getParam("productId")] = event.getParam("productPrice");
        component.set("v.productsToSetPrices", mapOfProducts);
        let mapp = component.get("v.productsToSetPrices");
    },
    doSetPrices : function(component, event){
        let setPricesAction = component.get("c.setStandardPrices");
        setPricesAction.setParams({
            "prices" : component.get("v.productsToSetPrices")
        });
        setPricesAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.find("informationToast").openInformationToast($A.get("{!$Label.c.Success}"),
                                                                        $A.get("{!$Label.c.Success}"),
                                                                        $A.get("{!$Label.c.Success}"));
            }else{
                component.find("errorToast").showError(response);
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
    }
})