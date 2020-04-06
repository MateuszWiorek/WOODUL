/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
({
        showModal : function(component, event, helper) {
           helper.doShowModal(component, event)
        },
        hideModal : function(component,event, helper){
            helper.doHideModal(component, event);
        },
        handleDeleteRecord: function(component, event, helper){
            helper.doDeleteRecord(component, event);
            helper.doHideModal(component,event);
        },
        showDetails : function(component, event, helper){
            helper.doShowDetails(component, event);
        },
        createNewDisc : function(component, event, helper){
            helper.doCreateNewDiscount(component,event);
        }

})