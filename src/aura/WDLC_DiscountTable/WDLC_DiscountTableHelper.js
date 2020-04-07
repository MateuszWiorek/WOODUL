/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    doOnInit : function(component, event){
        let initAction = component.get("c.getAllDiscounts");
            initAction.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    component.set("v.data", response.getReturnValue());
                }else{
                    component.find("errorToast").showError(response);
                }
            });
        $A.enqueueAction(initAction);
   },
    doRefreshMap : function(component, event){
        let mapToDiscount = component.get("v.selectedProductsToDiscountMap");
        if(event.getParam("isSelected")){
        mapToDiscount[event.getParam("productId")] = event.getParam("productPrice");
    }else{
        mapToDiscount[event.getParam("productId")] = -1;
        }
    },
})