({
    init: function (component, event, helper) {
        helper.doInit(component, event);
    },

    handleMapDetails : function(component, event, helper){
        helper.doHandleMapDetails(component, event);
    },
    handleMarkerSelect : function(component, event, helper){
        helper.doHandleMarkerSelect(component,event);
    }
});