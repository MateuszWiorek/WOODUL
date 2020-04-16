/**
 * Created by Mateusz Wiorek on 09.04.2020.
 */
({
    doOnInit : function(component, event){
       let getProductsWithPrice = component.get("c.getProductsWithoutPrice");
       getProductsWithPrice.setCallback(this, function(response){
           if(response.getState() === "SUCCESS"){
               component.set("v.hiddenResults", response.getReturnValue());
               component.set("v.results", response.getReturnValue());
               if(response.getReturnValue().length == 0){
                   let stepEvent = $A.get("e.c:WDLC_ProgressIndicatorSet");
                   stepEvent.setParams({
                       'step' : 'step-2'
                   });
                   stepEvent.fire();
               }
           }
       });
       $A.enqueueAction(getProductsWithPrice);
    },
})