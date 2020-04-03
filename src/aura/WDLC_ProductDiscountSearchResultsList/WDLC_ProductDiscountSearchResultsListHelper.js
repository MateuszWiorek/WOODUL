/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    doOnInit : function(component,event){
        let types = ['percentage', 'cash'];
        component.set("v.types", types);
        let initAction = component.get("c.getAllDiscounts");
        initAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let tabs = response.getReturnValue();
                let discounts = [];
                tabs.forEach(function(item){
                    discounts.push(item.Name);
                });
                component.set("v.discounts", discounts);
            }
        });
        $A.enqueueAction(initAction);
    },
    doRefreshPrice : function(component, event){
        let mapOfProducts = component.get("v.productsToDiscountMap");
        mapOfProducts[event.getParam("productId")] = event.getParam("productPrice");
        component.set("v.productsToSetPrices", mapOfProducts);
        let mapp = component.get("v.productsToSetPrices");
        for(let key in mapp){
            console.log(key);
            console.log(mapp[key]);
        }
    },
    doShowNewPrice : function(component, event){
        let products = component.get("v.results");
        let arrayOfProducts = component.find('element');

        for (let i = 0; i< arrayOfProducts.length; i++ ){
            arrayOfProducts[i].setPriceAfterDiscount(component.find("toDiscount").get('v.value'),component.get("v.amountToDiscount"));
        }
    },
    doSetNewPrices : function(component, event){
        let setNewPricesAction = component.get("c.addProductsToDiscount");
        let pricebookName = component.find("pricebookId").get("v.value");
        setNewPricesAction.setParams({
            "prices" : component.get("v.selectedProductsToDiscountMap"),
            "pricebookName" : pricebookName
        });
        setNewPricesAction.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                alert('success');
            }
        });
        $A.enqueueAction(setNewPricesAction);
    },
    doRefreshMap : function(component, event){
        let mapToDiscount = component.get("v.selectedProductsToDiscountMap");
        if(event.getParam("isSelected")){
        mapToDiscount[event.getParam("productId")] = event.getParam("productPrice");
    }else{
        mapToDiscount[event.getParam("productId")] = -1;
        }
    },
    doGetDisc : function(component, event){
        let initAction = component.get("c.getAllDiscounts");
        initAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let tabs = response.getReturnValue();
                let discounts = [];
                tabs.forEach(function(item){
                    discounts.push(item.Name);
                });
                component.set("v.discounts", discounts);
            }
        });
        $A.enqueueAction(initAction);
    },
    doShowDiscountDetails : function(component, event){
        let detailsEvent = $A.get("e.c:WDLC_SendPricebookDetails");
        console.log('dwa');
        detailsEvent.setParams({
            "pricebookId" : component.find("pricebookId").get("v.value")
        });
        console.log(detailsEvent.getParam("pricebookId"));
        detailsEvent.fire();
        console.log('dd');
    }
})