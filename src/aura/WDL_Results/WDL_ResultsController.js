({
    handleApplicationEvent : function(cmp, event, helper) {
            let nameFromEv = event.getParam("searchItemName");
            let address = event.getParam("searchItemAddress");
            cmp.set("v.nameFromEvent", nameFromEv);
            cmp.set("v.addressFromEvent", address);
            helper.doSearch(cmp, event, helper);
        },

        getRecord : function(component, event, helper){
            helper.doGetRecord(component, event);
        },
        showSpinner: function(component, event, helper) {
            component.set("v.Spinner", true);
        },
        hideSpinner : function(component,event,helper){
            component.set("v.Spinner", false);
        }
})