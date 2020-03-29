/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    openModalCase : function(component, event, helper){
        component.set("v.showDetailsModal", false);
        component.set("v.showModal", true);
    },
    sendDataToCase : function(component, event, helper){
        helper.doSendDataToCase(component, event);
    },
    closeModalCase : function(component, event){
        component.set("v.showModal", false);
    },
    openOrderDetails : function(component){
        component.set("v.showDetailsModal", true);
    },
    closeOrderDetails : function(component){
        component.set("v.showDetailsModal", false);
    },
})