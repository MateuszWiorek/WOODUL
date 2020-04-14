/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    doOnInit: function(component, event){
        let getDiscountsAction = component.get("c.getDiscounts");
        getDiscountsAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.results", response.getReturnValue());
            }
        });
        $A.enqueueAction(getDiscountsAction);
    }
})