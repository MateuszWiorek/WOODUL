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
        onInit : function(component, event, helper){
                setInterval(function(){
                    let typeOfComponent = component.get("v.typeOfModal");
                    if(typeOfComponent === 'complaintDetails'){
                        helper.refreshComments(component,event);
                    }
                }, 5000);
        }
})