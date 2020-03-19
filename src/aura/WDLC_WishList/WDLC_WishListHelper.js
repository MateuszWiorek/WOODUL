/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */
({
    doDoInit : function(component, event){
        let getWishListAction = component.get("c.getWishlistedProducts");

        getWishListAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.wishlist", response.getReturnValue());
            }else{
                component.set("v.emptyInformation", $A.get("{!$Label.c.WDLC_Error}"));
            }
        })
    }
})