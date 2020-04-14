/**
 * Created by Mateusz Wiorek on 27.03.2020.
 */
({
    openToast: function(component, event){
        let params = event.getParam('arguments');
        if(params){
            let message = params.errorMessage;
        let resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
                                "type" : $A.get("{!$Label.c.WDLC_Error}"),
                                "title": $A.get("{!$Label.c.WDLC_Error}"),
                                "message": message.getError()[0]
                            });
        resultsToast.fire();
        }
    },
        openInfoToast: function(component, event){
            let params = event.getParam('arguments');
            if(params){
                 let message = params.message;
                 let title = params.title;
        }
        let infoToast = $A.get("e.force:showToast");
        infoToast.setParams({
            "title" : title,
            "message" : message
        });
        infoToast.fire();
    }
})