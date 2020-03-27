/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
    doOnInit : function(component, event){
        let productsUrl = decodeURIComponent(window.location.search.substring(1));
        let variables = productsUrl.split('&');
        let searchQuery;
        for (let i = 0; i<variables.length;i++){
            if(variables[i].split('=')[0] ='searchItem'){
                console.log(variables);
                searchQuery = variables[i].split('=')[1].replace('+',' ');
            }
        }

        let findAction = component.get("c.findProducts");
        if(searchQuery === ""){
            component.set("v.results", []);
            component.set("v.searchResult","");
        }else{
            findAction.setParams({
                "name" : searchQuery
            });

            findAction.setCallback(this, function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    component.set("v.results", response.getReturnValue());
                    component.set("v.searchResult", searchQuery);
                }else{
                    component.find("toastComponent").openErrorToast(response);
                }
            });
            $A.enqueueAction(findAction);
        }
    }
})