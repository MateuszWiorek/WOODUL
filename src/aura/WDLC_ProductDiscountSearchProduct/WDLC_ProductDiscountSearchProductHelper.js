/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    doSearchProducts : function(component, event){
        let sendValueToSearch = $A.get("e.c:WDLC_SendValuesToSearchDiscount");
        sendValueToSearch.setParams({
        "query" : component.get("v.itemToSearch")
        });
        sendValueToSearch.fire();
    }
})