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
        console.log('ha');
        helper.doRemoveProduct(component, event);
    },
    changeProductCounter : function(component, event, helper){
        helper.doChangeProductCounter(component, event);
    },
    onInit : function(component){
        console.log(component.get("v.cell"));
    },
    goToProduct : function(component){
        let productId = component.get("v.cell").product.productId;
        let productToSend = component.get("v.cell").product;
        let productNameToUrl = productToSend.productName.toLowerCase().replace(' ','-');
        let urlToProduct = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/product/'
        + productNameToUrl +'/'+productId;
        window.open(urlToProduct, '_top');
    }
})