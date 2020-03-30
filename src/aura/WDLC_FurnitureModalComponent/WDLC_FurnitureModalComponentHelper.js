/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */
({
    doSendDataToCase : function(component, event){
        let createCaseAction = component.get("c.addComplaint");
        let prodName = component.get("v.product");
        let sub = component.get("v.subject");
        let desc = component.get("v.description");
        createCaseAction.setParams({
            "productName" : prodName,
            "subject" : sub,
            "description" : desc
        });

        createCaseAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                console.log(response);
                let toast = component.find("toastComponent");
                if(response.getReturnValue() == true){
                    toast.openInformationToast($A.get("{!$Label.c.WDLC_ComplaintSuccesSend}"),
                                                $A.get("{!$Label.c.Success}"), $A.get("{!$Label.c.Success}"));
                }else{
                    toast.openInformationToast($A.get("{!$Label.c.WDLC_ComplaintErrorSending}")
                            , $A.get("{!$Label.c.Error}"), $A.get("{!$Label.c.Error}"));
                }
                    component.set("v.showModal", false);
            }else{
                let toast = component.find("toastComponent");
                toast.openInformationToast(response.getError()[0], $A.get("{!$Label.c.Error}"), $A.get("{!$Label.c.Error}"));
            }
        });

        $A.enqueueAction(createCaseAction);
    }
})