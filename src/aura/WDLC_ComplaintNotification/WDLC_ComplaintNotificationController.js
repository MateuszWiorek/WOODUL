/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
    onInit: function(component, event){
        const pes = component.find('peService');
        pes.subscribe(component.get("v.channel"),function(callback){
         if(callback != true){
             console.log('not subscribed to channel');
         }
        });
    },
    notifyUser: function(component,event){
        let message = event.getParam('data');
//        component.find("informationToast").openInformationToast($A.get("{!Label.c.WDLC_OnYourComplaint}"),
//         $A.get("{!$Label.c.Success}"), $A.get("{!Label.c.WDLC_NewMessage}"));
        let resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
                                "type" : $A.get("{!$Label.c.Success}"),
                                "title": $A.get("{!Label.c.WDLC_NewMessage}"),
                                "message": $A.get("{!Label.c.WDLC_OnYourComplaint}")
                            });
        resultsToast.fire();
    }
})