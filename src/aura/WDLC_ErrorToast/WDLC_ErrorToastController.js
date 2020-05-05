/**
 * Created by Mateusz Wiorek on 27.03.2020.
 */
({
    openToast: function(component, event){
        let params = event.getParam('arguments');
        let erMessage;
        if(params){
            erMessage = params.errorMessage;
        }
        let resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "type" : $A.get("{!$Label.c.WDLC_ErrorToast}"),
            "title": $A.get("{!$Label.c.WDLC_ErrorToast}"),
            "message": erMessage.getError()[0].message
        });
        resultsToast.fire();
    },
    openInfoToast: function(component, event){
        let params = event.getParam('arguments');
        let message;
        let title;
            if(params){
                 message = params.message;
                 title = params.title;
        }
        let infoToast = $A.get("e.force:showToast");
        infoToast.setParams({
            "title" : title,
            "message" : message
        });
        infoToast.fire();
    }
})