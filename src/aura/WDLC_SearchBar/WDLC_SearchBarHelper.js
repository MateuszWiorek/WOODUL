/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
    doSendData: function(component, event){
        let eventAction =  $A.get("e.c:WDLC_SednItemToSearch");
        eventAction.setParams({
            "searchItem" : component.get("v.itemSearch")
        });
        eventAction.fire();
    },
    doClear : function(component, event){
        component.set("v.itemSearch", "");
    }
})