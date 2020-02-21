/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */
({
    handleAccountSending: function(component, event){
        let accountFromEvent = event.getParam("accountDetailInfo");
        component.set("v.accountDetail", accountFromEvent);
    },

handleDeleteRecord: function(component, event, helper) {
        if(confirm('Are you sure you want to delete this record?')){

            let action = component.get("c.deleteAccount");
                action.setParams({
                "Id" : component.get("v.accountDetail.Id")
                });

            action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let resultsToast = $A.get("e.force:showToast");
                    if(response.getReturnValue()){
                        resultsToast.setParams({
                            "type" : "success",
                            "title" : "Deleted",
                            "message": "The record was deleted."
                        });
                        let clearEvent = $A.get("e.c:WDL_DetailsInfoValues");
                         clearEvent.setParams({
                              "accountDetailInfo" : null
                          })
                          clearEvent.fire();
                         resultsToast.fire();
                    }else{
                        resultsToast.setParams({
                            "type" : "error",
                            "title": "Error",
                            "message": "Error."
                        });
                         resultsToast.fire();
                    }
            }
        });
//        $A.get('e.force:refreshView').fire();
        $A.enqueueAction(action);
    }
},

    editRecord : function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": component.get("v.accountDetail.Id")
       });
        editRecordEvent.fire();
//        $A.get('e.force:refreshView').fire();
    }
})