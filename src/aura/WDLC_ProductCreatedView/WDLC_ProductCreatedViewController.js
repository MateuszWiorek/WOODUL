/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
    handleEvent: function(component,event){
        let idFromEvent = event.getParam("productId");
        component.set("v.productId", idFromEvent);
        let getPhotosAction = component.get("c.loadPhotos");
        getPhotosAction.setParams({
            "id" : idFromEvent
        });
        getPhotosAction.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
                let photosIds = response.getReturnValue();
                let photosUrls = [];
                photosIds.forEach(function(item){
                    photosUrls.push('https://woodu-dev-ed.lightning.force.com/sfc/servlet.shepherd/document/download/'+item.FileId__c);
                    console.log(item);
                });
                console.log(JSON.stringify(photosUrls));
                component.set("v.firstPhotoUrl", photosUrls);
                        let getMainAction = component.get("c.getMainPhoto");
                        getMainAction.setParams({
                            "productId" : component.get("v.productId")
                        });
                        getMainAction.setCallback(this, function(response){
                            component.set("v.mainPhotoUrl", response.getReturnValue());
                        });
                        $A.enqueueAction(getMainAction);
            }else{
                console.log(response.getError()[0]);
            }
        });
    $A.enqueueAction(getPhotosAction);
    },
    refreshMain:function(component,event){
        console.log("in refresh :D");
        let getMainAction = component.get("c.getMainPhoto");
        getMainAction.setParams({
            "productId" : component.get("v.productId")
        });
        getMainAction.setCallback(this, function(response){
            component.set("v.mainPhotoUrl", response.getReturnValue());
        });
        $A.enqueueAction(getMainAction);
    },
    goToPage : function(component, event){
        let navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
              "recordId": component.get("v.productId"),
              "slideDevName": "detail"
            });
            navEvt.fire();
    }
})