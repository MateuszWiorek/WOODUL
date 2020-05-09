/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
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