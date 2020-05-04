/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    doOnInit : function(component, event){
        let initAction = component.get("c.getProduct");
        let productUrl = decodeURIComponent(window.location.pathname.substring(1));
        let variables = productUrl.split("/");
        let productToShowId = variables[variables.length-1];
        initAction.setParams({
            "productId" : productToShowId
        });
        initAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.product", response.getReturnValue());
                component.set("v.productId", productToShowId);
                component.set("v.livePhoto", response.getReturnValue().productPhotoUrl);
                 if(component.get("v.product").productPrice != component.get("v.product").productPriceAfterDiscount){
                     $A.util.addClass(component.find("standardPrice"), 'standardPrice');
                     $A.util.addClass(component.find("discountPrice"), 'discountPrice');
                     $A.util.removeClass(component.find("discountPrice"), 'discountPriceNone');
                 }
            let getPhotosAction = component.get("c.getPhotos");
            getPhotosAction.setParams({
                "productId" : productToShowId
            });
            getPhotosAction.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    if(response.getReturnValue().length>0){
                        component.set("v.productPhotos", response.getReturnValue());
                    }else{
                        component.set("v.productPhotos", component.get("v.product").productPhotoUrl);
                    }
                }else{
                    component.find("errorToast").showError(response);
                }
            });
            $A.enqueueAction(getPhotosAction)
            }
        });

        $A.enqueueAction(initAction);
    },
    doAddToCart : function(component,event){
        let productToBuyId = component.get("v.productId");
        let addToCartAction = component.get("c.changeProductCounter");
        addToCartAction.setParams({
            'productId' : productToBuyId,
            'newValue' : component.get("v.counter")
        });
        addToCartAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let toastComp = component.find("toastComponent");
                toastComp.openInformationToast($A.get("{!$Label.c.WDLC_AddedToCart}"),
                                                $A.get("{!$Label.c.HRHM_Success}"), $A.get("{!$Label.c.HRHM_Success}"));
                let basketEvent = $A.get("e.c:WDLC_RefreshBasketComponent");
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
                let prod = component.get("v.product");
                prod.isWishlisted = !prod.isWishlisted;
                component.set("v.product", prod);
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
                let prod = component.get("v.product");
                prod.isWishlisted = !prod.isWishlisted;
                component.set("v.product", prod);
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(removeFromList);
    }
})