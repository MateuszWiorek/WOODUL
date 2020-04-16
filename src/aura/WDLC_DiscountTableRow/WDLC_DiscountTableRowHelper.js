/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({

    doShowDiscountDetails : function(component, event){
        let detailsEvent = $A.get("e.c:WDLC_SendPricebookDetails");
        detailsEvent.setParams({
            "pricebookId" : component.get("v.discount").Name
        });
        detailsEvent.fire();
    }
})