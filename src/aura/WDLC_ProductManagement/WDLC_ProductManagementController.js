/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
    onInit : function(component, event){
       component.set("v.canBeShown", true);
      let userId = $A.get("$SObjectType.CurrentUser.Id");
      component.set("v.userId", userId);
      let initAction = component.get("c.getFamilyOptions");
      initAction.setCallback(this,function(response){
          if(response.getState() === "SUCCESS"){
              component.set("v.families", response.getReturnValue());
          }else{
              component.find("errorToast").showError(response);
          }
      });
      $A.enqueueAction(initAction);
    },
    handleUploadFinished: function (component, event) {
        let uploadedFiles = event.getParam("files");
        let filesIds = [];
        uploadedFiles.forEach(function(item){
            filesIds.push(item.documentId);
        });
        component.set("v.filesId", filesIds);
   },
   createProduct : function(component, event){
       let createAction = component.get("c.addProduct");
       createAction.setParams({
           "name" : component.get("v.name"),
           "description" : component.get("v.description"),
           "family" : component.find("picklistFamilies").get("v.value"),
           "photosIds" : component.get("v.filesId")
       });
       createAction.setCallback(this, function(response){
           console.log(response.getState());
           if(response.getState() === "SUCCESS"){
                let navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": response.getReturnValue(),
                    "slideDevName": "detail"
                });
                navEvt.fire();
           }else{
              component.find("errorToast").showError(response);
           }
       });
       $A.enqueueAction(createAction);
   },
   goBackToList : function(component){
       let getListViewIdAction = component.get("c.getListViewId");
       getListViewIdAction.setCallback(this, function(response){
           if(response.getState() === "SUCCESS"){
                let navEvent = $A.get("e.force:navigateToList");
                navEvent.setParams({
                   "listViewId": response.getReturnValue(),
                   "listViewName": null,
                    "scope": "Product2"
                });
                navEvent.fire();
           }else{
               component.find("errorToast").showError(response);
           }
       });
       $A.enqueueAction(getListViewIdAction);
   }
})