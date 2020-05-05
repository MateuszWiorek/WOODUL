/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
    sendData: function(component, event){
        let productToSend = component.get("v.itemSearch");
        let itemToSearch = productToSend.replace(' ','+');
        let urlToProduct = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/store?searchItem='
        + itemToSearch;
        window.open(urlToProduct, '_top');
    },
    clear : function(component, event){
        component.set("v.itemSearch", "");
        let eventAction =  $A.get("e.c:WDLC_SednItemToSearch");
        eventAction.setParams({
            "searchItem" : ""
        });
        eventAction.fire();
    }
})