/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    doSendFurnitureIdToProductView : function(component, event){
        let productToSend = component.get("v.product");
        let productToSendId = productToSend.productId;
        let idEvent = component.get("e.c:WDLC_SendFurnitureId");
        idEvent.setParams({
            "productId" : productToSendId
        });
        idEvent.fire();
    }
})