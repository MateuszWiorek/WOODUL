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
                toast.openInformationToast("Success", "success", "success");
                }else{
                toast.openInformationToast("error", "error", "error");
                }
            }else{
                let toast = component.find("toastComponent");
                toast.openInformationToast(response.getError()[0], "error", "error");
            }
        });
        $A.enqueueAction(createCaseAction);
    }
})