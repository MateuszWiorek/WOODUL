/**
 * Created by Mateusz Wiorek on 26.03.2020.
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
                    console.log(response.getReturnValue());
                    for(let i of response.getReturnValue()){
                        total += i.totalCost;
                        productsInBasket += i.quantity;
                    }
                    component.set("v.totalPrice", total);
                    component.set("v.itemsInBasket", productsInBasket);
                }else{
                    //toast will be here
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
                            console.log(response.getReturnValue());
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
        let splittedAddress = pageURL.substr(0,pageURL.lastIndexOf('/')+1) +'order';
        window.open(splittedAddress, '_top');
    }
})