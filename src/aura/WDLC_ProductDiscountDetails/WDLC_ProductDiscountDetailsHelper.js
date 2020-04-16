/**
 * Created by Mateusz Wiorek on 03.04.2020.
 */
({
    doShowDetails : function(component, event){
        let discountName = event.getParam("pricebookId");
        let getDiscountAction = component.get("c.getDiscount");
        getDiscountAction.setParams({
            "name" : discountName
        });
        getDiscountAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                  component.set("v.name", response.getReturnValue().Name);
                  component.set("v.isDiscountSelected", true);
                  component.set("v.pricebookId", response.getReturnValue().Id);
                  component.set("v.pricebook", response.getReturnValue());
                  console.log(component.get("v.pricebook").StartDate__c);
                  console.log(new Date(response.getReturnValue().EndDate__c));
                  console.log(new Date());
                  if(new Date() > new Date(response.getReturnValue().EndDate__c)){
                      component.set("v.canBeEdited", false);
                  }
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
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(getDiscountAction);
    },
    doEditDiscount : function(component, event){
        let editAction = component.get("c.editPricebook");
        editAction.setParams({
            'pricebookId' : component.get("v.pricebookId"),
            'startDate' : component.get("v.newStartDate"),
            'endDate' : component.get("v.newEndDate")
        });
        editAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.find("informationToast").openInformationToast("Edited discount successfully", "success", "success");
                component.set("v.pricebook", response.getReturnValue());
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(editAction);
    }
})