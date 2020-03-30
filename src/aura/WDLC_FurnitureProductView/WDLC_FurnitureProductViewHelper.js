/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    doHandleProductId : function(component, event){
        let productId = event.getParam("productId");
    },
    doAddToCart : function(component,event){
        let productToBuyId = component.get("v.productId");
        let addToCartAction = component.get("c.addProductToBasket");
        addToCartAction.setParams({
            'productId' : productToBuyId
        });
        addToCartAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let toastComp = component.find("toastComponent");
                toastComp.openInformationToast($A.get("{!$Label.c.WDLC_AddedToCart}"),
                                                $A.get("{!$Label.c.HRHM_Success}"), $A.get("{!$Label.c.HRHM_Success}"));
                let basketEvent = $A.get("e:c:WDLC_RefreshBasketComponent");
                basketEvent.fire();
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(addToCartAction);
    },
    doAddToWishList : function(component, event){
        let productToWishListId = component.get("v.productId");
        let addToWishListAction = component.get("c.addProductToWishList");
        addToWishListAction.setParams({
            "productId" : productToWishListId
        });
        addToWishListAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.find("toastComponent").openInformationToast($A.get("{!$Label.c.WDLC_AddedToObserved}"),
                                        $A.get("{!$Label.c.HRHM_Success}"), $A.get("{!$Label.c.HRHM_Success}"));
            }else{
                component.find("errorToast").showError(response);
            }

        });
        $A.enqueueAction(addToWishListAction);
    },
    doRemoveFromList : function(component, event){
        let productToWishListId = component.get("v.productId");
        let removeFromList = component.get("c.removeFromList");
        removeFromList.setParams({
            "productId" : productToWishListId
        });
        removeFromList.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.find("toastComponent").openInformationToast($A.get("{!$Label.c.WDLC_RemovedFromObserved}"),
                                                $A.get("{!$Label.c.HRHM_Success}"), $A.get("{!$Label.c.HRHM_Success}"));
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(removeFromList);
    }
})