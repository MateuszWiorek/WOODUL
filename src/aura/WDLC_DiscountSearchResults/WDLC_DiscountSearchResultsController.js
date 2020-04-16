/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    addProductWithPriceToMap : function(component, event, helper){
        helper.doAddProductWithPriceToMap(component, event);
    },
    setPrices : function(component, event, helper){
        helper.doSetPrices(component, event);
    },
    searchItems : function(component, event, helper){
        helper.doSearchItems(component, event);
    },
    refreshMap : function(component, event, helper){
        helper.doRefreshMap(component,event);
    },
    removeItems : function(component, event){
        let deleteAction = component.get("c.removeItemsFromPricebook");
        deleteAction.setParams({
            "pricebookId" : component.get("v.discount"),
            "productsId" : component.get("v.selectedProductsToDiscountMap")
        });
        deleteAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.find("informationToast").openInformationToast("Removed items successfully", "Success", "Success");
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(deleteAction);
    }
})