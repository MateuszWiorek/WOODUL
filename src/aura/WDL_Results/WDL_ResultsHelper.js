({
    doSearch: function(component, event, helper){
             let action = component.get("c.searchAccounts");
             let shippingAddressV = component.get("v.addressFromEvent");
             let name = component.get("v.nameFromEvent");
             action.setParams({
                 "name" : name,
                  "division" : shippingAddressV
                  });

             action.setCallback(this, function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    let accountsArray = response.getReturnValue();
                    console.log(accountsArray);
                    console.log(accountsArray.length);

                    for( let i = 0; i<accountsArray.length; i++){
                        if(accountsArray[i].Description != null){
                        let stringDescription = accountsArray[i].Description
                        stringDescription = stringDescription.length>60 ?
                         stringDescription.substring(0,60) + '...' :
                         stringDescription
                         ;
                         accountsArray[i].Description = stringDescription;
                         }
                    }

                console.log(accountsArray);
                component.set("v.accountRows", accountsArray);
                let mapEvent = $A.get("e.c:WDL_SendAccountListToMap");
                mapEvent.setParams({
                        "accountsList" : component.get("v.accountRows")
                });
                    mapEvent.fire();
                   }
              });

              $A.enqueueAction(action);
        },

        doGetRecord : function(component, event){
             let accounts = [];
             let acc = component.get("v.accountRows")[event.currentTarget.dataset.index];
             let detailsEvent = $A.get("e.c:WDL_DetailsInfoValues");
             detailsEvent.setParams({
                 "accountDetailInfo" : acc
             });
             accounts.push(acc);
             let mapEvent = $A.get("e.c:WDL_SendAccountListToMap");
             mapEvent.setParams({
                 "accountsList" : accounts
             });
             mapEvent.fire();
             detailsEvent.fire();

             let divisionIndex = event.currentTarget.dataset.index;
             let arr = component.find("resultItem");
                 for(let i=0; i<arr.length; i++){
                     let itemIndex = arr[i].getElement().getAttribute("data-index");
                     if(itemIndex !== divisionIndex){
                         $A.util.removeClass(arr[i], "selectedRow");
                      }else{
                         $A.util.addClass(arr[i], "selectedRow");
                      }
                 }
             }
})