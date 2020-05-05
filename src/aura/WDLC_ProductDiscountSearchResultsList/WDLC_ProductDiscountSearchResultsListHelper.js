/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    onInit : function(component,event){
        let types = ['percentage', 'fixed'];
        component.set("v.types", types);
    },
    refreshPrice : function(component, event){
        let mapOfProducts = component.get("v.productsToDiscountMap");
        mapOfProducts[event.getParam("productId")] = event.getParam("productPrice");
        component.set("v.productsToSetPrices", mapOfProducts);
    },
    showNewPrice : function(component, event){
        let products = component.get("v.results");
        let arrayOfProducts = component.find('element');
        for (let i = 0; i< arrayOfProducts.length; i++ ){
            arrayOfProducts[i].setPriceAfterDiscount(component.find("toDiscount").get('v.value'),component.get("v.amountToDiscount"));
        }
    },
    setNewPrices : function(component, event){
        let setNewPricesAction = component.get("c.addProductsToDiscount");
        setNewPricesAction.setParams({
            "prices" : component.get("v.selectedProductsToDiscountMap"),
            "pricebookName" : component.get("v.discount")
        });
        setNewPricesAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.find("informationToast").openInformationToast($A.get("{!$Label.c.Success"),
                                                                        $A.get("{!$Label.c.Success"),
                                                                        $A.get("{!$Label.c.Success"));
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(setNewPricesAction);
    },
    refreshMap : function(component, event){
        let mapToDiscount = component.get("v.selectedProductsToDiscountMap");
        if(event.getParam("isSelected")){
        mapToDiscount[event.getParam("productId")] = event.getParam("productPrice");
    }else{
        mapToDiscount[event.getParam("productId")] = -1;
        }
    },
    getDisc : function(component, event){
        let initAction = component.get("c.getAllDiscounts");
        initAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let tabs = response.getReturnValue();
                let discounts = [];
                tabs.forEach(function(item){
                    discounts.push(item.Name);
                });
                component.set("v.discounts", discounts);
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(initAction);
    },
    showDiscountDetails : function(component, event){
        let detailsEvent = $A.get("e.c:WDLC_SendPricebookDetails");
        detailsEvent.setParams({
            "pricebookId" : component.find("pricebookId").get("v.value")
        });
        detailsEvent.fire();
    },
    getItems : function(component, event){
        let getItemsAction = component.get("c.findProducts");
        getItemsAction.setParams({
            "name" : event.getParam("query")
        });
        getItemsAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.results", response.getReturnValue());
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(getItemsAction);
    }
})