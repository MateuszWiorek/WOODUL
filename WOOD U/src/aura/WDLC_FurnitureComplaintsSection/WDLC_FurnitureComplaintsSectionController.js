/**
 * Created by Mateusz Wiorek on 29.03.2020.
 */
({
    onInit : function(component, event, helper){
        let getComplaintsAction = component.get("c.getCases");
        getComplaintsAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.complaints", response.getReturnValue());
            }
        });
        $A.enqueueAction(getComplaintsAction);
    }
})