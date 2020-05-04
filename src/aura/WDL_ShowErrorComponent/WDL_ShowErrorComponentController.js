({
    openToast: function(component, event){
        let params = event.getParam('arguments');
        if(params){
            let type = params.errorType;
            let message = params.errorMessage;
            let title = params.errorTitle
        let resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
                                "type" : type,
                                "title": title,
                                "message": message
                            });
        resultsToast.fire();
        }
    }
})