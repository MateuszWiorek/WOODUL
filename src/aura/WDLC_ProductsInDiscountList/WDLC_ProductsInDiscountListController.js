/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    onInit : function(component, event, helper){
        component.set("v.isDisabled", false);
        component.set("v.discountName",event.getParam('pricebookId'));
       let actions = [
            { label: $A.get("{!$Label.c.WDLC_Add}"), name: 'add_item' }
        ];
        let isButtonDisabled;
        let checkIfDiscountIsActive = component.get("c.isPricebookActive");
        checkIfDiscountIsActive.setParams({
            "name" : component.get("v.discountName")
        });
        checkIfDiscountIsActive.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                if(response.getReturnValue() == true){
                    isButtonDisabled = false;
                }else{
                    isButtonDisabled = true;
                    component.set("v.isDisabled", true);
                }
            }else{
                component.find("toast").showError(response);
                isButtonDisabled = false;
            }
            component.set("v.columns",[
                {label: $A.get("{!$Label.c.WDLC_Name}"), fieldName: 'productName', type : 'String', editable: true},
                {label: $A.get("{!$Label.c.WDLC_StandardPrice}"), sortable: true,  fieldName: 'productPrice', type: 'currency',
                                typeAttributes: { currencyCode: $A.get("$Locale.currencyCode")}, editable: true},
                {label: $A.get("{!$Label.c.WDLC_Action}"), typeAttributes: {label : $A.get("{!$Label.c.WDLC_AddToDiscount}"),
                                 name: 'add_item', title: $A.get("{!$Label.c.WDLC_ClickToAdd}"), disabled: isButtonDisabled },
                                 type : 'button', editable: false}
            ]);
            helper.doOnInit(component, event);
        });
        $A.enqueueAction(checkIfDiscountIsActive);
    },
    searchProducts : function(component, event, helper){
            helper.doSearchProducts(component, event);
    },
    handleSort : function(component, event, helper){
        var sortedBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set('v.data', cloneData);
        component.set('v.sortDirection', sortDirection);
        component.set('v.sortedBy', sortedBy);
    },
    updateSelectedText : function(component, event, helper){
        helper.doUpdateSelectedText(component,event);
    },
    setDetails : function(component, event,helper){
        helper.doSetDetails(component, event);
        helper.doSearchProducts(component, event);
    },
    handleMassSelect : function(component, event, helper){
        component.set("v.isMassSelectActive", !component.get("v.isMassSelectActive"));
    },
    handleAction : function(component, event, helper){
        helper.doHandleAction(component, event);
    },
    refreshResults : function(component, event, helper){
          helper.doRefreshResults(component, event);
          helper.doSearchProducts(component, event);
    },
    hideAll : function(component, event, helper){
        component.set("v.canBeShown", false);
    }
})