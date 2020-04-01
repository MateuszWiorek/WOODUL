/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
    doOnInit : function(component, event){
            let getListAction = component.get("c.getProductsInBasket");
            getListAction.setCallback(this,function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    let total = 0;
                    let productsInBasket = 0;
                    component.set("v.productsToOrder", response.getReturnValue());
                    for(let i of response.getReturnValue()){
                        total += i.totalCost;
                        productsInBasket += i.quantity;
                    }
                    component.set("v.totalPrice", total);
                    component.set("v.itemsInBasket", productsInBasket);
                }else{
                    component.find("errorToast").openErrorToast(response);
                }
            });
            $A.enqueueAction(getListAction);
        },

    doRefreshTable : function(component, event){
                    let getListAction = component.get("c.getProductsInBasket");
                    getListAction.setCallback(this,function(response){
                        let state = response.getState();
                        if(state === "SUCCESS"){
                            let total = 0;
                            let productsInBasket = 0;
                            component.set("v.productsToOrder", response.getReturnValue());
                            for(let i of response.getReturnValue()){
                                total += i.totalCost;
                                productsInBasket += i.quantity;
                            }
                            component.set("v.totalPrice", total);
                            component.set("v.itemsInBasket", productsInBasket);
                        }else{
                        }
                    });
                    $A.enqueueAction(getListAction);
                },
    doGoToOrder : function(component, event){
        let pageURL = decodeURIComponent(window.location.href);
        let orderAddress = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/order';
        window.open(orderAddress, '_top');
    },
    doOrderWithDefaultAddress : function(component, event){
        let makeDefaultOrderAction = component.get("c.orderWithDefaultCustomerData");
        makeDefaultOrderAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.find("toastComponent").openInformationToast($A.get("{!$Label.c.WDLC_OrderSuccess}"),
                                                 $A.get("{!$Label.c.Success}"),$A.get("{!$Label.c.Success}"));
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(makeDefaultOrderAction);
    }
})