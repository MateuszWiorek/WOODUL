/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    doOnInit: function(component, event){
        console.log('cc');
        let initAction = component.get("c.getProductsWithoutPrice");
        initAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
            component.set("v.productsWithoutPrice", response.getReturnValue());
            }else{
                alert(response.getError()[0]);
            }
        });
        $A.enqueueAction(initAction);
    },
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
            alert(response.getState());
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
            }
        });
        $A.enqueueAction(findAction);
    }
})