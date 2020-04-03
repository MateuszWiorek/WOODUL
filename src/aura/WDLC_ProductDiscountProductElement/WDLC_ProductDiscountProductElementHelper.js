/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    doSetStandardPrice : function(component, event){
        let prodId = component.get("v.productWithoutPrice");
        let prodPrice = component.get("v.price");
        let setPriceEv = component.getEvent("setPriceEvent");
        setPriceEv.setParams({
            "productId" : prodId.Id,
            "productPrice" : prodPrice
        });
        setPriceEv.fire();
    }
})