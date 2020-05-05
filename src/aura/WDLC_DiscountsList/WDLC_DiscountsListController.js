/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    onInit : function(component, event, helper){
        helper.onInit(component, event);
    },
    handleRowAction : function(component, event, helper){
        helper.handleRowAction(component, event);
    },
    refresh : function(component, event, helper){
        helper.onInit(component, event);
    },
    openModal : function(component, event){
        component.set("v.showModal", true);
        component.set("v.type", 'newDiscount');
    },
    searchPricebooks : function(component, event, helper){
        helper.searchPricebooks(component, event);
    },
    setStep : function(component, event, helper){
        helper.setStep(component, event);
    },
    handleCellChange : function(component, event, helper){
        helper.handleCellChange(component, event);
    },
    goToDiscounts : function(component, event, helper){
        helper.goToDiscounts(component, event);
    }
})