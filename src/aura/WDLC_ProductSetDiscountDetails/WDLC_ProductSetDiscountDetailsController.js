/**
 * Created by Mateusz Wiorek on 09.04.2020.
 */
({
    handleEvent : function(component, event, helper){
        helper.handleEvent(component, event);
    },
    onInit : function(component, event, helper){
        helper.onInit(component, event);
    },
    handleDiscountValueChange : function(component, event, helper){
        helper.handleDiscountValueChange(component, event);
    },
    updatePriceAfterDiscount : function(component, event, helper){
        helper.updatePriceAfterDiscount(component, event);
    },
    submitPrices : function(component, event, helper){
        helper.submitPrices(component, event);
    },
    handleRowAction : function(component, event, helper){
        helper.handleRowAction(component, event);
    },
    handleSelection : function(component, event, helper){
        helper.handleSelection(component, event);
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
        console.log('in controller');
        helper.refreshResults(component, event);
    },
    searchProducts : function(component, event, helper){
        helper.searchProducts(component, event);
    },
    refreshIt : function(component, event,helper){
        console.log('ddd');
        helper.refreshIt(component, event);
    }
})