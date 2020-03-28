/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doInit : function(component, event, helper){
        helper.doOnInit(component, event);
    },
    makeOrderr : function(component, event, helper){
        helper.doMakeOrder(component, event);
    },
    incrementCounter : function(component,event,helper){
        helper.doIncrementCounter(component,event);
    },
    decrementCounter : function(component, event, helper){
        helper.doDecrementCounter(component,event);
    },
    refreshTable : function(component, event, helper){
        helper.doRefreshTable(component, event);
    },
    closeModal : function(component, event,helper){
        helper.doRefreshTable(component,event);
        component.set("v.showModal",false);
    },
    openModal : function(component){
        component.set("v.showModal", true);
    }
})