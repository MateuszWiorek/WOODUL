/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
    onInit : function(component, event){
        let productsUrl = decodeURIComponent(window.location.search.substring(1));
        let variables = productsUrl.split('&');
        let searchQuery;
        for (let i = 0; i<variables.length;i++){
            if(variables[i].split('=')[0] ='searchItem'){
                searchQuery = variables[i].split('=')[1].replace('+',' ');
            }
        }

        let findAction = component.get("c.findProducts");

            findAction.setParams({
                "name" : searchQuery
            });

            findAction.setCallback(this, function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    component.set("v.results", response.getReturnValue());
                    component.set("v.searchResult", searchQuery);
                    component.set("v.sizeOfResults", response.getReturnValue().length);
                }else{
                    component.find("toastComponent").openErrorToast(response);
                }
            });
            $A.enqueueAction(findAction);
        }
})