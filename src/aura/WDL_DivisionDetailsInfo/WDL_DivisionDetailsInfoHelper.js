/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    doEditRecord : function(component, event){
          let editRecordEvent = $A.get("e.force:editRecord");
          let refreshEvent = $A.get("e.c:WDL_RefreshAfterDeleteRecord");
          editRecordEvent.setParams({
              "recordId": component.get("v.accountDetail.Id")
          });
          editRecordEvent.fire();
    },
    doShowModal : function(component, event){
          component.set("v.showModal",true);
    }
})