/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    onInit: function(component, event){
       let actions = [
                    { label: $A.get("{!$Label.c.WDLC_ShowDetails}"), name: 'show_details' },
                    { label: $A.get("{!$Label.c.WDLC_Delete}"), name: 'delete' }
       ];
        component.set("v.columns",[
                        {label: $A.get("{!$Label.c.WDLC_Name}"), typeAttributes:
                                    {label : {fieldName : $A.get("{!$Label.c.WDLC_ProductName}")}, name: 'show_details',
                                    title: $A.get("{!$Label.c.WDLC_ClickToViewDetails}") }, type : 'button', editable: true},
                        {label: $A.get("{!$Label.c.WDLC_StartDate}"), fieldName: 'StartDate__c', type : 'Date', editable: true},
                        {label: $A.get("{!$Label.c.WDLC_EndDate}"), fieldName: 'EndDate__c', type : 'Date', editable: true},
                        {type: $A.get("{!$Label.c.WDLC_ActionButton}"), typeAttributes: {rowActions: actions },}
        ]);
        component.set('v.steps', [
                    { label: $A.get("{!$Label.c.WDLC_StepStandardPrices}"), value: 'step-1' },
                    { label: $A.get("{!$Label.c.WDLC_StepDiscountSelect}"), value: 'step-2' },
                    { label: $A.get("{!$Label.c.WDLC_StepSetPrices}"), value: 'step-3' }
                ]);
        let getDiscountsAction = component.get("c.getDiscounts");
        getDiscountsAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.results", response.getReturnValue());
            }
        });
        $A.enqueueAction(getDiscountsAction);
    },
    handleRowAction : function(component, event){
        let action = event.getParam('action');
        let row = event.getParam('row');
        switch (action.name){
            case 'show_details' :
                let detailsEvent = $A.get('e.c:WDLC_SendPricebookDetails');
                detailsEvent.setParams({
                    'pricebookId' : row.Name
                });
                detailsEvent.fire();
                component.set("v.currentStep", 'step-3');
                component.set("v.showPricebooks", false);
                break;
            case 'delete' :
                component.set("v.rowToDelete", row.Name);
                component.set("v.type", 'deletePricebook');
                component.set("v.showModal", true);
                break;
        }
    },
    searchPricebooks : function(component, event){
        let getPricebooks = component.get("c.findPricebooks");
        getPricebooks.setParams({
            "name" : component.get("v.query")
        });
        getPricebooks.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.results", response.getReturnValue());
            }else{
               component.find("toast").showError(response);
            }
        });
        $A.enqueueAction(getPricebooks);
    },
    handleCellChange : function(component, event){
        let draftValues = event.getParam('draftValues');
        let res = component.get("v.results");
        let startDate;
        let endDate;
        let idToChange;
        res.forEach(function(item){
            if(item.Id == draftValues[0].Id){
                if('StartDate__c' in draftValues[0]){
                    idToChange = draftValues[0].Id;
                    startDate = draftValues[0].StartDate__c;
                    endDate = item.EndDate__c;
                }
                 if('EndDate__c' in draftValues[0]){
                    idToChange = draftValues[0].Id;
                    endDate = draftValues[0].EndDate__c;
                    startDate = item.StartDate__c;
                 }
                let editPricebookAction = component.get("c.editPricebook");
                editPricebookAction.setParams({
                    "pricebookId" : idToChange,
                    "startDate" : startDate,
                    "endDate" : endDate
                });
                editPricebookAction.setCallback(this, function(response){
                    if(response.getState() === "SUCCESS"){
                           helper.doOnInit(component, event);
                           component.find("informationToast").openInformationToast(
                                                               $A.get("{!$Label.c.WDLC_PriceCalculated}"),
                                                               $A.get("{!$Label.c.Success}"),
                                                               $A.get("{!$Label.c.WDL_SubmitPricesToastInformation}"));
                    }else{
                            component.find("toast").showError(response);
                    }
                });
                $A.enqueueAction(editPricebookAction);
            }
        });
        component.set("v.results", res);
    },
    setStep : function(component, event){
        component.set("v.currentStep", event.getParam('step'));
        if(event.getParam('step') == 'step-2'){
            component.set("v.currentStep", 'step-2');
            component.set('v.showPricebooks', true);
            $A.get("e.c:WDLC_HideDetails").fire();
        }
    },
    goToDiscounts : function(component, event){
        component.set("v.currentStep", 'step-2');
        component.set('v.showPricebooks', true);
        $A.get("e.c:WDLC_HideDetails").fire();
    }
})