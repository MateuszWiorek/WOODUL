({
    handleAccountSending: function(component, event){
        let accountFromEvent = event.getParam("accountDetailInfo");
        component.set("v.accountDetail", accountFromEvent);
    },
    handleDeleteRecord: function(component, event, helper){
        helper.doDeleteRecord(component, event);
        helper.doHideModal(component,event);
    },

    editRecord : function(component, event, helper) {
        helper.doEditRecord(component, event);
    },

    showModal : function(component, event, helper) {
       helper.doShowModal(component, event)
    }
})