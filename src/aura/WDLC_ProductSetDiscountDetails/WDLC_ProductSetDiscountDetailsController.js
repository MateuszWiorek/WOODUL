/**
 * Created by Mateusz Wiorek on 09.04.2020.
 */
({
    handleEvent : function(component, event, helper){
        helper.doHandleEvent(component, event);
    },
    onInit : function(component, event, helper){
        helper.doOnInit(component, event);
    },
    handleDiscountValueChange : function(component, event, helper){
        helper.doHandleDiscountValueChange(component, event);
    },
    updatePriceAfterDiscount : function(component, event, helper){
        helper.doUpdatePriceAfterDiscount(component, event);
    },
    submitPrices : function(component, event, helper){
        helper.doSubmitPrices(component, event);
    },
    handleRowAction : function(component, event, helper){
        helper.doHandleRowAction(component, event);
    },
    handleSelection : function(component, event, helper){
        helper.doHandleSelection(component, event);
     },
    handleMassDelete : function(component, event, helper){
         component.set("v.typeModal", 'deleteItemsFromPricebook');
         component.set("v.showModal",true);
    },
    handleMassClick : function(component){
        component.set("v.isMassDeleteActive", !component.get("v.isMassDeleteActive"));
    },
    handleChange : function(component, event){
        component.set("v.value", event.getParam("value"));
    },
    refreshResults : function(component, event, helper){
        helper.doRefreshResults(component, event);
    },
    searchProducts : function(component, event, helper){
        helper.doSearchProducts(component, event);
    }
})