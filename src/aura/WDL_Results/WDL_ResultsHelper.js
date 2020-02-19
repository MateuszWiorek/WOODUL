
({
    doSearch: function(component){
             let action = component.get("c.searchAccounts");

             let shippingAddress = component.get("v.searchShippingAddress");
             let name = component.get("v.searchName");
               console.log(shippingAddress);
               console.log(name);
             action.setParams({"name" : name, "shippingAddress" : shippingAddress});

             action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){

                   }
              });
                $A.enqueueAction(action);
        }
})