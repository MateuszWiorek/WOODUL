/**
 * Created by Mateusz Wiorek on 09.04.2020.
 */
({
    onInit : function(component, event, helper){
        component.set("v.columns",[
            {label: $A.get("{!Label.c.WDLC_Name}"), fieldName: 'productName', type : 'String', editable: false},
            {label: $A.get("{!Label.c.WDLC_StandardPrice}"), sortable: true,  fieldName: 'productPrice', type : 'String',
                                    placeholder: $A.get("{!$Label.c.WDLC_StandardPricePlaceholder}"), editable: true}
        ]);
        helper.doOnInit(component, event);
    },
    handleSettingStandardPrices : function(component, event){
        let draftValues = event.getParam('draftValues');
        console.log(draftValues[0]);
        let res = component.get("v.results");
        res.forEach(function(item){
            if(item.productId == draftValues[0].productId){
                console.log(item);
                item.productPrice = parseFloat(draftValues[0].productPrice).toFixed(2).toString();
            }
        });
        component.find("toast").showInfo($A.get("{!$Label.c.WDLC_SubmitInsertedPrices}"), $A.get("{!$Label.c.WDLC_Updated"));
        component.set("v.results", res);
    },
    handleSubmit : function(component, event, helper){
        console.log(component.get("v.results"));
        let submitStandard = component.get("c.setStandardPrices");
        let res = component.get("v.results");
        let pricesMap = component.get("v.pricesToSet");
        res.forEach(function(item){
        pricesMap[item.productId] = parseFloat(item.productPrice);
        });
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
                console.log(response.getError()[0]);
            }
        });
        $A.enqueueAction(submitStandard);
    },
    searchProducts : function(component, event, helper){
                let resultsBeforeFilter = component.get("v.hiddenResults")
                let query = component.get("v.query")
                console.log(resultsBeforeFilter);
                console.log(query);
                let resultsAfterFilter = resultsBeforeFilter.filter(item => item.productName.toUpperCase().startsWith(query.toUpperCase()));
                component.set("v.results", resultsAfterFilter);
    }
})