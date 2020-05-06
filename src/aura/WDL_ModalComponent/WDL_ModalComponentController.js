/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
        showModal : function(component, event, helper) {
           helper.doShowModal(component, event)
        },
        hideModal : function(component,event, helper){
            helper.doHideModal(component, event);
        },
        handleDeleteRecord: function(component, event, helper){
            helper.doDeleteRecord(component, event);
            helper.doHideModal(component,event);
        },
        showDetails : function(component, event, helper){
            helper.doShowDetails(component, event);
        },
        createNewDisc : function(component, event, helper){
            helper.doCreateNewDiscount(component,event);
        },
        deletePricebook : function(component, event, helper){
                let deleteAction = component.get("c.deleteDiscount");
                deleteAction.setParams({
                    "name" : component.get("v.pricebookName")
                });
                deleteAction.setCallback(this, function(response){
                    if(response.getState() === "SUCCESS"){
                        component.find("errorChildComponent").openInformationToast("Removed item successfully",
                         "Success",
                          "Success");
                        component.set("v.canBeShown", false);
                        $A.get("e.c:WDLC_RefreshDiscounts").fire();
                    }
                });
                $A.enqueueAction(deleteAction);
        },
        handleSuccess : function(component, event){
            component.set("v.canBeShown", false);
            $A.get("e.c:WDLC_RefreshDiscounts").fire();
        },
        deleteProductFromPricebook : function(component, event, helper){
            let deletePricebookAction = component.get("c.removeItemsFromPricebook");
            deletePricebookAction.setParams({
                "pricebookId" : component.get("v.discountId"),
                "productsId" : component.get("v.productsToDelete")
            });
            deletePricebookAction.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                        component.find("errorChildComponent").openInformationToast("Removed item successfully",
                         "Success",
                          "Success");
                          component.set("v.canBeShown", false);
                       let eveeve = $A.get("e.c:WDLC_RefreshItems");
                       eveeve.setParams({
                           "products" : component.get("v.productsToDelete"),
                           "pricebook" : component.get("v.discountId")
                       });
                       console.log(eveeve.getParam("products"));
                       eveeve.fire();
                }else{
                    component.find("errorToastComponent").showError(response);
                }
            });
            $A.enqueueAction(deletePricebookAction);
        },
        goToDiscounts : function(component, event, helper){
                   let stepEvent = $A.get("e.c:WDLC_ProgressIndicatorSet");
                   stepEvent.setParams({
                       'step' : 'step-2'
                   });
                   stepEvent.fire();
                   component.set("v.canBeShown", false);
        }
})