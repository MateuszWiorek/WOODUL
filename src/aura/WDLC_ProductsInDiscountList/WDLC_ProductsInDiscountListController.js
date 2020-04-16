/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    onInit : function(component, event, helper){
        component.set("v.isDisabled", false);
        console.log(event.getParam('pricebookId'));
        component.set("v.discountName",event.getParam('pricebookId'));
       let actions = [
            { label: $A.get("{!$Label.c.WDLC_Add}"), name: 'add_item' }
        ];
        let isButtonDisabled;
        let checkIfDiscountIsActive = component.get("c.isPricebookActive");
        checkIfDiscountIsActive.setParams({
            "name" : component.get("v.discountName")
        });
        console.log(JSON.stringify(checkIfDiscountIsActive.getParams()));
        checkIfDiscountIsActive.setCallback(this, function(response){
            console.log(JSON.stringify(response.getState()));
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
                if(response.getReturnValue() == true){
                    isButtonDisabled = false;
                }else{
                    isButtonDisabled = true;
                    component.set("v.isDisabled", true);
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
            }else{
                isButtonDisabled = false;
        component.set("v.columns",[
            {label: $A.get("{!$Label.c.WDLC_Name}"), fieldName: 'productName', type : 'String', editable: true},
            {label: $A.get("{!$Label.c.WDLC_StandardPrice}"), sortable: true,  fieldName: 'productPrice', type: 'currency',
                             typeAttributes: { currencyCode: $A.get("$Locale.currencyCode")}, editable: true},
            {label: $A.get("{!$Label.c.WDLC_Action}"), typeAttributes: {label : $A.get("{!$Label.c.WDLC_AddToDiscount}"),
                             name: 'add_item', title: $A.get("{!$Label.c.WDLC_ClickToAdd}"), disabled: isButtonDisabled },
                             type : 'button', editable: false}
        ]);
                helper.doOnInit(component, event);
            }
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
             var selectedRows = event.getParam('selectedRows');
             let selectedList = component.get("v.selectedProducts");
             let selectedSet = new Set(selectedList);
             selectedRows.forEach(function(item){
                 selectedSet.add(item.productId);
             });
             component.set("v.selectedProducts", selectedSet);
    },
    setDetails : function(component, event,helper){
        let setDetailsEvent = $A.get("e.c:WDLC_SendProductsList");
        setDetailsEvent.setParams({
            "products" : Array.from(component.get("v.selectedProducts")),
            "discount" : component.get("v.discountName")
        });
        setDetailsEvent.fire();
        helper.doSearchProducts(component, event);
    },
    handleMassSelect : function(component, event, helper){
        component.set("v.isMassSelectActive", !component.get("v.isMassSelectActive"));
    },
    handleAction : function(component, event, helper){
        let action = event.getParam('action');
        console.log(action.name);
        let row = event.getParam('row');
        console.log(JSON.stringify(row));
        switch (action.name){
            case 'add_item' :
             let selectedList = component.get("v.selectedProducts");
             let selectedSet = new Set(selectedList);
             selectedSet.add(row.productId);
             component.set("v.selectedProducts", (selectedSet));
        let setDetailsEvent = $A.get("e.c:WDLC_SendProductsList");
        setDetailsEvent.setParams({
            "products" : Array.from(component.get("v.selectedProducts")),
            "discount" : component.get("v.discountName")
        });
        console.log(JSON.stringify(setDetailsEvent.getParams()));
        setDetailsEvent.fire();
        helper.doSearchProducts(component, event);
        break;
        }
    },
    refreshResults : function(component, event, helper){
        console.log('1');
        let removed = event.getParam("products");
                console.log('2');
        console.log(removed);
        let removedList = [];
        for(let i = 0; i< removed.length; i++){
                    console.log('3');
            console.log(removed[i]);
            removedList.push(removed[i]);
        }
        console.log(removedList);
        let selectedList = Array.from(component.get("v.selectedProducts"));
        console.log(4);
        console.log(selectedList);
        let selectedListAfterRefresh = [];
         for (let i = 0; i < removedList.length; i++){
            let ind = selectedList.indexOf(removedList[i]);
            console.log(5);
            console.log(ind);
            if(ind>=0){
                selectedList.splice(ind,ind+1);
            }
         }
         console.log(selectedList);

        let selectedSet = new Set(selectedList);
        console.log(selectedList);
        component.set("v.selectedProducts", Array.from(selectedSet));
        helper.doSearchProducts(component, event);
    },
    hideAll : function(component, event, helper){
        component.set("v.canBeShown", false);
    }
})