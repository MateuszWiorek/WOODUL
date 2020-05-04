/**
 * Created by Mateusz Wiorek on 07.04.2020.
 */
({
    onInit : function(component, event, helper){
        let getDiscountsAction = component.get("c.getDiscounts");
        getDiscountsAction.setCallback(this, function(response){
            if (response.getState() === "SUCCESS"){
                component.set("v.discounts", response.getReturnValue());
            }else{
                alert('gun gun');
            }
        });
        $A.enqueueAction(getDiscountsAction);
    },
    openModal : function(component, event){
        component.set("v.canBeShown", true);
    }
})