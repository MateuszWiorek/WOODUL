/**
 * Created by Mateusz Wiorek on 01.04.2020.
 */
({
    onInit : function(component,event,helper){
        let getPhotosAction = component.get("c.loadPhotos");
        getPhotosAction.setParams({
            "id" : component.get("v.recordId")
        });
        getPhotosAction.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
                let photosIds = response.getReturnValue();
                let photosUrls = [];
                photosIds.forEach(function(item){
                    photosUrls.push($A.get("{!$Label.c.WDLC_StartUrl}")+item.FileId__c);
                });
                component.set("v.photos", photosUrls);
                        let getMainAction = component.get("c.getMainPhoto");
                        getMainAction.setParams({
                            "productId" : component.get("v.recordId")
                        });
                        getMainAction.setCallback(this, function(response){
                            component.set("v.mainPhoto", response.getReturnValue());
                        });
                        $A.enqueueAction(getMainAction);
            }else{
                console.log(response.getError()[0]);
            }
        });
    $A.enqueueAction(getPhotosAction);
    },
    showPhotos : function(component){
        component.set("v.showPhoto", true);
    },
    hidePhotos : function(component){
        component.set("v.showPhoto",false);
    },
    refreshMain : function(component, event){
        let getMainAction = component.get("c.getMainPhoto");
        getMainAction.setParams({
            "productId" : component.get("v.recordId")
        });
        getMainAction.setCallback(this, function(response){
            component.set("v.mainPhoto", response.getReturnValue());
        });
        $A.enqueueAction(getMainAction);
    }
})