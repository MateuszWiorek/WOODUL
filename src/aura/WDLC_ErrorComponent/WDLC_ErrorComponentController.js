/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    openToast: function(component, event){
        let params = event.getParam('arguments');
        if(params){
            let response = params.errorResponse;
        let resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
                                "type" : "error",
                                "title": "Error",
                                "message": response.getError()[0].message
                            });
        resultsToast.fire();
        }
    }
})