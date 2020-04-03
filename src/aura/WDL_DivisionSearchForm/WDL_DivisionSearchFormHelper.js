({
    doFindAccounts: function(component, event){
                let appEvent = $A.get("e.c:WDL_SendValues");
                appEvent.setParams({
                    "searchItemName" : component.get("v.searchName"),
                    "searchItemAddress" : component.get("v.searchShippingAddress")
                });
                appEvent.fire();
    },
    doClear:function(component, event){
            component.set("v.searchName", '');
            component.set("v.searchShippingAddress", '');

             let blankEvent = $A.get("e.c:WDL_SendValues");
             blankEvent.setParams({
             "searchItemName" : "",
              "searchItemAddress" : ""
              });
              let clearEvent = $A.get("e.c:WDL_DetailsInfoValues");
              clearEvent.setParams({
                  "accountDetailInfo" : null
              })
              clearEvent.fire();
              blankEvent.fire();
        }
})