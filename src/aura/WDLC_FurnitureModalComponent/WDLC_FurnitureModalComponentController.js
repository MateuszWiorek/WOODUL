/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */
({
        openModalCase : function(component, event, helper){
            component.set("v.typeOfModal", 'Complaint');
        },
        sendDataToCase : function(component, event, helper){
            helper.doSendDataToCase(component, event);
        },
        closeModalCase : function(component, event){
            component.set("v.typeOfModal", '');
            component.set("v.showModal", false);
        },
        postComment : function(component,event, helper){
            helper.doPostComment(component,event);
        },
        refreshCommentsAfterEvent : function(component,event,helper){
            let eventCaseId = event.getParam("caseID");
            let idFromComplaint = component.get("v.complaint").Id;
            if(eventCaseId == idFromComplaint){
                helper.refreshComments(component,event);
            }else{
                let resultsToast = $A.get("e.force:showToast");
                component.find("toastComponent").openInformationToast('New message','success',
                                                'on your complaint: ' + eventCaseId);
            }
        }
})