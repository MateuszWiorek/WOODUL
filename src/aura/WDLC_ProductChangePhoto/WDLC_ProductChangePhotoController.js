/**
 * Created by Mateusz Wiorek on 01.04.2020.
 */
({
onInit : function(component,event,helper){
        let getPhotosAction = component.get("c.getImages");
        getPhotosAction.setParams({
            "productId" : component.get("v.recordId")
        });
        getPhotosAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.photos", response.getReturnValue());
                        let getMainAction = component.get("c.getMainPhoto");
                        getMainAction.setParams({
                            "productId" : component.get("v.recordId")
                        });
                        getMainAction.setCallback(this, function(response){
                            component.set("v.mainPhoto", response.getReturnValue());
                        });
                        $A.enqueueAction(getMainAction);
            }else{
                component.find("errorToast").showError(response);
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
if(response.getState() === "SUCCESS"){
                component.set("v.mainPhoto", response.getReturnValue());
            }else{
                component.find("errorToast").showError(response);
            }
        });
        $A.enqueueAction(getMainAction);
    }
})