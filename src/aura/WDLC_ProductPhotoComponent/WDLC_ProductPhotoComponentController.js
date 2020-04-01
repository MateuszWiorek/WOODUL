/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
    setAsMain: function(component, event){
        let setMain = component.get("c.setMainPhoto");
        setMain.setParams({
            "url" : component.get("v.photoUrl"),
            "productId" : component.get("v.productId")
        });
        setMain.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
            component.getEvent('changeEvent').fire();
            }
        });
        $A.enqueueAction(setMain);
    },
})