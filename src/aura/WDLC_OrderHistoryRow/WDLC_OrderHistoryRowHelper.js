/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    doSendDataToCase : function(component, event){
        let createCaseAction = component.get("c.addComplaint");
        let prodName = component.get("v.product");
        console.log(prodName);
        createCaseAction.setParams({
            "productName" : component.get("v.product"),
            "subject" : component.get("v.subject"),
            "description" : component.get("v.description")
        });
        createCaseAction.setCallback(this, function(response){
            let state = response.getState();
            if(state=== "SUCCESS"){
                let toast = component.find("toastComponent");
                if(response.getReturnValue() == true){
                toast.openInformationToast("Your complaint has been sent to our support", "success", "success");
                }else{
                toast.openInformationToast("We encountered an error while we was creating your complaint. Please try later."
                , "error", "error");
                }
                component.set("v.showModal", false);
            }else{
                let toast = component.find("toastComponent");
                toast.openInformationToast(response.getError()[0], "error", "error");
            }
        });
        $A.enqueueAction(createCaseAction);
    }
})