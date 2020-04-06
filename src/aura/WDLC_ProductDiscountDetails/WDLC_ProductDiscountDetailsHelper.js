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
                  component.set("v.name", response.getReturnValue().Name);
                  component.set("v.isDiscountSelected", true);
                  component.set("v.pricebookId", response.getReturnValue().Id);
                  let resultsAction = component.get("c.getProductsInDiscount");
                  resultsAction.setParams({
                      "discountId" : response.getReturnValue().Id,
                      "page" : component.get("v.page")
                  });
                  resultsAction.setCallback(this, function(response){
                      if(response.getState() === "SUCCESS"){
                          component.set("v.discountedItems", response.getReturnValue());
                      }else{
                          component.find("errorToast").showError(response);
                      }
                  });
                  $A.enqueueAction(resultsAction);
            }else{
                console.log(response.getError()[0]);
            }
        });
        $A.enqueueAction(getDiscountAction);
    }
})