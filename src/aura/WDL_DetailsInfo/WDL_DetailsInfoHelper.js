({
    doEditRecord : function(component, event){
                let editRecordEvent = $A.get("e.force:editRecord");
                let refreshEvent = $A.get("e.c:WDL_RefreshAfterDeleteRecord");
                editRecordEvent.setParams({
                     "recordId": component.get("v.accountDetail.Id")
               });
                editRecordEvent.fire();
    },
    doDeleteRecord : function(component, event){
                let childComponent = component.find("errorChildComponent");
                    let resultsToast = $A.get("e.force:showToast");
                    let action = component.get("c.deleteAccount");
                        action.setParams({
                        "Id" : component.get("v.accountDetail.Id")
                        });

                    action.setCallback(this, function(response){
                    let state = response.getState();
                    if(state === "SUCCESS"){
                            if(response.getReturnValue()){
                            let clearEvent = $A.get("e.c:WDL_DetailsInfoValues");
                            let refreshEvent = $A.get("e.c:WDL_RefreshAfterDeleteRecord");
                             childComponent.openInformationToast($A.get("$Label.c.WDL_RecordDeleted"), $A.get("$Label.c.Success"), $A.get("$Label.c.Success"));

                                 clearEvent.setParams({
                                      "accountDetailInfo" : null
                                  })
                                 clearEvent.fire();
                                 refreshEvent.fire();
                            }else{
                                childComponent.openInformationToast(response.getError()[0].message, $A.get("$Label.c.WDL_Error"), $A.get("$Label.c.WDL_Error"));

                            }
                    }else if (state === 'ERROR'){
                            childComponent.openInformationToast(response.getError()[0].message, $A.get("$Label.c.WDL_Error"), $A.get("$Label.c.WDL_Error"));

                    }
                });
                $A.enqueueAction(action);
    },
    doShowModal : function(component, event){
           component.set("v.showModal",true);
    },
    doHideModal : function(component, event){
            let sectionModal = document.getElementById("newClientSectionId");
            sectionModal.classList.remove("slds-fade-in-open");
            let backdropModal = document.getElementById("backdropAdding");
            backdropModal.classList.remove("slds-backdrop_open");
    }
})