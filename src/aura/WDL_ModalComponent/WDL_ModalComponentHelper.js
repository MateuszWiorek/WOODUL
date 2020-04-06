/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doDeleteRecord : function(component, event){
         let childComponent = component.find("errorChildComponent");
         errorComp = component.find("errorToastComponent");
         let resultsToast = $A.get("e.force:showToast");
         let action = component.get("c.deleteAccount");
         action.setParams({
             "Id" : component.get("v.accountDetail.Id")
         });

         action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                if(response.getReturnValue()){
                    let clearEvent = $A.get("e.c:WDL_DetailsInfoValues");
                    let refreshEvent = $A.get("e.c:WDL_RefreshAfterDeleteRecord");
                    childComponent.openInformationToast($A.get("$Label.c.WDL_RecordDeleted"),
                                                        $A.get("$Label.c.Success"), $A.get("$Label.c.Success"));
                    clearEvent.setParams({
                         "accountDetailInfo" : null
                    })
                    clearEvent.fire();
                    refreshEvent.fire();
                }else{
                    errorComp.showError(response);

                }
            }else if (state === 'ERROR'){
                    errorComp.showError(response);

            }
         });
         $A.enqueueAction(action);
    },
    doHideModal : function(component, event){
         let sectionModal = document.getElementById("newClientSectionId");
         sectionModal.classList.remove("slds-fade-in-open");
         let backdropModal = document.getElementById("backdropAdding");
         backdropModal.classList.remove("slds-backdrop_open");
         component.set("v.canBeShown",false);
        },
    doCreateNewDiscount : function(component, event){
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
            }
        });
        $A.enqueueAction(createDiscountAction);
    }
})