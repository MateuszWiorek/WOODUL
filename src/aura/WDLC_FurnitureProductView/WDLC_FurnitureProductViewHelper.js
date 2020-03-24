/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    doHandleProductId : function(component, event){
        let productId = event.getParam("productId");
    },
    doAddToCart : function(component,event){
        let productToBuyId = component.get("v.productId");
    }
})