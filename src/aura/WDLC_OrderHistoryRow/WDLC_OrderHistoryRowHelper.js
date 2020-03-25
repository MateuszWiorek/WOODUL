/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    doSendDataToCase : function(component, event){
        let createCaseAction = component.get("c.addComplaint");
        createCaseAction.setParams({
            "productName" : component.get("v.product"),
            "subject" : component.get("v.subject"),
            "description" : component.get("v.description")
        });
        createCaseAction.setCallback(this, function(response){
            let state = response.getState();
            if(state=== "SUCCESS"){
                console.log('todo');
            }
        });
        $A.enqueueAction(createCaseAction);
    }
})