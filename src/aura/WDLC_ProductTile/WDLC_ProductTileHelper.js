/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    doSendFurnitureIdToProductView : function(component, event){
        let productToSend = component.get("v.product");
        let productToSendId = productToSend.productId;
        let eUrl = $A.get("e.force:navigateToURL");
        let productNameToUrl = productToSend.productName.toLowerCase().replace(' ','-');
        let urlToProduct = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/product/'
        + productNameToUrl +'/'+productToSendId;
        console.log(urlToProduct);
        window.open(urlToProduct, '_top');
    },
    doAddToFavorite : function(component, event){
        let addAction = component.get("c.addToFavorite");
        addAction.setParams({
            "productId" : component.get("v.product").productId
        });
        console.log(component.get("v.product").productId);
        addAction.setCallback(this,function(response){
            let state = response.getState();
            let toast = component.find("toastComponent")
            if(state === "SUCCESS"){
                toast.openInformationToast($A.get("{!$Label.c.WDLC_AddedToObserved}"),
                $A.get("{!$Label.c.Success}"),$A.get("{!$Label.c.Success}"));
                let product = component.get("v.product");
                product.isWishlisted = !product.isWishlisted;
                component.set("v.product", product);
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(addAction);
    },
    doAddToOrder : function(component, event){
        let addToOrderAction = component.get("c.addToBasket");
        let productToAddId = component.get("v.product").productId;

        addToOrderAction.setParams({
            "productId" : productToAddId
        });
        addToOrderAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.find("toastComponent").openInformationToast($A.get("{!$Label.c.WDLC_AddedToCart}"),
                                                $A.get("{!$Label.c.Success}"),$A.get("{!$Label.c.Success}"));
                $A.get("e.c:WDLC_RefreshBasketComponent").fire();
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(addToOrderAction);
    }
})