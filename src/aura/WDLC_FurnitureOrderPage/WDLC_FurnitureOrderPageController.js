/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
    doInit : function(component, event, helper){
        helper.onInit(component, event);
    },
    makeOrderr : function(component, event, helper){
        helper.makeOrder(component, event);
        helper.openModal(component);
        helper.refreshTable(component,event);
    },
    incrementCounter : function(component,event,helper){
        helper.incrementCounter(component,event);
    },
    decrementCounter : function(component, event, helper){
        helper.decrementCounter(component,event);
    },
    refreshTable : function(component, event, helper){
        helper.refreshTable(component, event);
    }
})