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
    doSearchProducts : function(component, event){
        let resultsBeforeFilter = component.get("v.hiddenResults")
        let query = component.get("v.query")
        let resultsAfterFilter = resultsBeforeFilter
               .filter(item => item.productName.toUpperCase().startsWith(query.toUpperCase()));
        component.set("v.results", resultsAfterFilter);
    },
    doHandleSubmit : function(component, event){
        console.log(component.get("v.results"));
        let submitStandard = component.get("c.setStandardPrices");
        let res = component.get("v.results");
        let pricesMap = component.get("v.pricesToSet");
        res.forEach(item => pricesMap[item.productId] = parseFloat(item.productPrice));
        submitStandard.setParams({
            'prices' : pricesMap
        });
        submitStandard.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                component.find("informationToast").openInformationToast($A.get("{!$Label.c.WDLC_PricesSubmitted}"),
                                                                        $A.get("{!$Label.c.Success}"),
                                                                        $A.get("{!$Label.c.Success}"));
                helper.doOnInit(component, event);
            }else{
                component.find("toast").showError(response);
            }
        });
        $A.enqueueAction(submitStandard);
    },
    doHandleSettingStandardPrices : function(component, event){
        let draftValues = event.getParam('draftValues');
        console.log(draftValues[0]);
        let res = component.get("v.results");
        res.forEach(function(item){
            if(item.productId == draftValues[0].productId){
                item.productPrice = parseFloat(draftValues[0].productPrice)
                                    .toFixed(2)
                                    .toString();
            }
        });
        component.find("toast").showInfo($A.get("{!$Label.c.WDLC_SubmitInsertedPrices}"), $A.get("{!$Label.c.WDLC_Updated"));
        component.set("v.results", res);
    }
})