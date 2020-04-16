/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    onInit : function(component, event, helper){
        helper.doOnInit(component, event);
    },
    handleRowAction : function(component, event, helper){
        helper.doHandleRowAction(component, event);
    },
    refresh : function(component, event, helper){
        helper.doOnInit(component, event);
    },
    openModal : function(component, event){
        component.set("v.showModal", true);
        component.set("v.type", 'newDiscount');
    },
    searchPricebooks : function(component, event, helper){
        helper.doSearchPricebooks(component, event);
    },
    setStep : function(component, event, helper){
        helper.doSetStep(component, event);
    },
    handleCellChange : function(component, event, helper){
        helper.doHandleCellChange(component, event);
    },
    goToDiscounts : function(component, event, helper){
        helper.doGoToDiscounts(component, event);
    }
})