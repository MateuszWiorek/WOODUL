({
	onInit : function(component, event, helper) {
        let actionP = component.get("c.getAllProducts");
        actionP.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.products", response.getReturnValue());
            }
        });
    $A.enqueueAction(actionP);
	},
    getPhoto: function(component, event){
        let getPhotoAction = component.get("c.getMainPhoto");
        getPhotoAction.setParams({
            "productId": event.getParam("value")
        });
        getPhotoAction.setCallback(this,function(response){
            if(response.getState()==="SUCCESS"){
                component.set("v.firstImageUrl", response.getReturnValue());
            }
        });
        let getPriceAction = component.get("c.getCurrentPrice");
        getPriceAction.setParams({
            "productId":event.getParam("value")
        });
        getPriceAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.firstProductPrice", response.getReturnValue());
            }
        });
        $A.enqueueAction(getPriceAction);
        $A.enqueueAction(getPhotoAction);
    },
    updateProductToCompare : function(component, event){
        component.set("v.recordToCompareId", component.find("selectToCompare").get("v.value"));
        console.log(component.find("selectToCompare").get("v.value"));
        let getPhotoAction = component.get("c.getMainPhoto");
                getPhotoAction.setParams({
            "productId": component.find("selectToCompare").get("v.value")
        });
        getPhotoAction.setCallback(this,function(response){
            if(response.getState()==="SUCCESS"){
                component.set("v.secondImageUrl", response.getReturnValue());
                component.set("v.showPicklist", false);
            }
        });
                let getPriceAction = component.get("c.getCurrentPrice");
        getPriceAction.setParams({
            "productId": component.get("v.recordToCompareId")
        });
        getPriceAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.secondProductPrice", response.getReturnValue());
            }
        });
        $A.enqueueAction(getPriceAction);
        $A.enqueueAction(getPhotoAction);
    },
    closeModal: function(component){
        component.set("v.canShowModal", false);
        component.set("v.recordToCompareId","");
        component.set("v.showPicklist",true);
    },
    showPicklist : function(component){
        component.set("v.showPicklist",true);
    },
    goToProduct: function(component){
        window.open($A.get("{!$Label.c.WDLC_UrlToProduct}")+'.../'+component.get("v.recordToCompareId"));
    }
})