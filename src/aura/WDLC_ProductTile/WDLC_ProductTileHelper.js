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
    },
    doAddToFavorite : function(component, event){
        let addAction = component.get("c.addToFavorite");
        addAction.setParams({
            "productId" : component.get("v.product").productId
        });
        addAction.setCallback(this,function(response){
            let state = response.getState();
            let toast = component.find("toastComponent")
            if(state === "SUCCESS"){
                toast.openInformationToast("Success","Success","Success");
                let product = component.get("v.product");
                product.isWishlisted = !product.isWishlisted;
                component.set("v.product", product);
            }else{
                toast.openInformationToast("Error","Error","Error");
            }
        });
        $A.enqueueAction(addAction);
    }
})