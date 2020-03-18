/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
    doHandleApplicationEvent: function(component, event){
        let eventSearchItem = event.getParam("searchItem");
        let findAction = component.get("c.findProducts");
        if(eventSearchItem === ""){
            component.set("v.results", []);
            component.set("v.searchResult","");
        }else{
            findAction.setParams({
                "name" : eventSearchItem
            });

            findAction.setCallback(this, function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    component.set("v.results", response.getReturnValue());
                    component.set("v.searchResult", eventSearchItem);
                }
            });
            $A.enqueueAction(findAction);
        }
    }
})