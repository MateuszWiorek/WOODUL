/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    createNewDisc : function(component, event){
        let createDiscountAction = component.get("c.createNewDiscount");
        createDiscountAction.setParams({
            "name" : component.get("v.discountName"),
            "startDate" : component.get("v.discountStartDate"),
            "endDate" : component.get("v.discountEndDate")
        });
        createDiscountAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                $A.get("e.c:WDLC_RefreshDiscounts").fire();
            }else{
                component.find("errorToast").showError(response);
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(createDiscountAction);
    }
})