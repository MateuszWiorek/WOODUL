/**
 * Created by Mateusz Wiorek on 03.04.2020.
 */
({
    doShowDetails : function(component, event){
        let discountName = event.getParam("pricebookId");
        console.log(discountName);
        let getDiscountAction = component.get("c.getDiscount");
        getDiscountAction.setParams({
            "name" : discountName
        });
        getDiscountAction.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
                  component.set("v.pricebookId", response.getReturnValue().Id);
            }
        });
        $A.enqueueAction(getDiscountAction);
    }
})