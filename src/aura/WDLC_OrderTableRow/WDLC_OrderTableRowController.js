/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    incrementCounter : function(component,event,helper){
        helper.doIncrementCounter(component,event);
    },
    decrementCounter : function(component, event, helper){
        helper.doDecrementCounter(component,event);
    },
    removeProduct : function(component, event, helper){
        helper.doRemoveProduct(component, event);
    },
    changeProductCounter : function(component, event, helper){
        helper.doChangeProductCounter(component, event);
    },
    onInit : function(component){
    },
    goToProduct : function(component){
        let productId = component.get("v.cell").product.productId;
        let productToSend = component.get("v.cell").product;
        let productNameToUrl = productToSend.productName.toLowerCase().replace(' ','-');
        let urlToProduct = $A.get("{!$Label.c.WDLC_UrlToProduct}")
        + productNameToUrl +'/'+productId;
        window.open(urlToProduct, '_top');
    }
})