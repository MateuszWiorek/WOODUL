/**
 * Created by Mateusz Wiorek on 16.04.2020.
 */
({
    doHandleEvent : function(component, event){
        let getItemsAction = component.get("c.findProductsWithIds");
        getItemsAction.setParams({
            "ids" : event.getParam("products"),
            "discountName" : event.getParam("discount")
        });
        getItemsAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let res = component.get("v.results");
                let selectedList = new Set();
                res.forEach(item => selectedList.add(item.productId));
                let resultsBeforeFilter = response.getReturnValue();
                let resultsAfterFilter = resultsBeforeFilter
                    .filter(item => !selectedList.has(item.productId));
                component.set("v.results", component.get("v.results").concat(resultsAfterFilter));
                component.set("v.hiddenResults", component.get("v.results"));
            }else{
                component.find("toast").showError(response);
            }
        });
        $A.enqueueAction(getItemsAction);
    },
    doOnInit : function(component, event){
        let getDates = component.get("c.getDiscountDates");
        getDates.setParams({
            "name" : component.get("v.discount")
        });
        getDates.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.discountDate", response.getReturnValue());
            }else{
                component.set("v.discountDate",'()')
            }
        });
        $A.enqueueAction(getDates);
        let actions = [
                    { label: 'Remove', name: 'remove_item' }
        ];
        if(component.get("v.discount") == 'Standard Price Book'){
               component.set("v.columns",[
                    {label: $A.get("{!$Label.c.WDLC_Name}"), fieldName: 'productName', type : 'String', editable: false},
                    {label: $A.get("{!$Label.c.WDLC_StandardPrice}"), sortable: true,  fieldName: 'productPrice', type: 'currency',
                                typeAttributes: { currencyCode: $A.get("$Locale.currencyCode")}, editable: true}
               ]);
               component.set("v.isStandard", true);
               component.set("v.isDisabledBecauseStandard",true);
        }else{
            let isButtonDisabled;
            let checkIfDiscountIsActive = component.get("c.isPricebookActive");
            checkIfDiscountIsActive.setParams({
                "name" : component.get("v.discount")
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
                    isButtonDisabled = true;
                }
                component.set("v.columns",[
                    {label: $A.get("{!$Label.c.WDLC_Name}"), fieldName: 'productName', type : 'String', editable: true},
                    {label: $A.get("{!$Label.c.WDLC_StandardPrice}"), sortable: true,  fieldName: 'productPrice', type: 'currency',
                                   typeAttributes: { currencyCode: $A.get("$Locale.currencyCode")},
                                   editable: false},
                    {label: $A.get("{!$Label.c.WDLC_Discount}"), type: 'currency',
                                   typeAttributes: { currencyCode: $A.get("$Locale.currencyCode")},
                                   fieldName: 'discountAmount', editable: !isButtonDisabled},
                    {label: $A.get("{!$Label.c.WDLC_NewPrice}"), sortable: true, fieldName: 'productPriceAfterDiscount',
                                   type: 'currency', typeAttributes:{ currencyCode: $A.get("$Locale.currencyCode")},
                                   editable: false},
                    {label: $A.get("{!$Label.c.WDLC_Action}"), typeAttributes: {label : $A.get("{!$Label.c.WDLC_Remove}"),
                                   name: 'remove_item', title: $A.get("{!$Label.c.WDLC_ClickToRemove}") ,
                                   disabled: isButtonDisabled}, type : 'button', editable: false}
                ]);
                component.set("v.isStandard", false);
            });
            $A.enqueueAction(checkIfDiscountIsActive);
        }
        let getDiscountId = component.get("c.getDiscountId");
        getDiscountId.setParams({
            "name" : component.get("v.discount")
        });
        getDiscountId.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
            let discId = response.getReturnValue();
            component.set("v.discountId", response.getReturnValue());
            let getItemsInDiscountAction = component.get("c.getProductsInDiscount");
            getItemsInDiscountAction.setParams({
                "discountId" : discId,
                "page" : 1
            });
            getItemsInDiscountAction.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    component.set("v.results", response.getReturnValue());
                    component.set("v.hiddenResults", response.getReturnValue());
                }else{
                             }
            });
            $A.enqueueAction(getItemsInDiscountAction);
            }else{
                component.find("toast").showError(response);
            }
        });
        $A.enqueueAction(getDiscountId);
    },
    doHandleDiscountValueChange : function(component, event){
        let type = component.get("v.value");
        let resultsTab = component.get("v.results");
        resultsTab.forEach(function(item){
            if(type === 'fixed'){
                if(parseFloat(item.productPrice)>component.get("v.amount") && component.get("v.amount")>0){
                    item.discountAmount = component.get("v.amount");
                    item.productPriceAfterDiscount = (parseFloat(item.productPrice) - component.get("v.amount"))
                                                    .toFixed(2)
                                                    .toString();
                }
            }else{
                if(component.get("v.amount")<100 && component.get("v.amount") >0){
                    item.productPriceAfterDiscount = (parseFloat(item.productPrice) - parseFloat(item.productPrice) * component.get("v.amount")/100)
                                                    .toFixed(2)
                                                    .toString();
                    item.discountAmount = (parseFloat(item.productPrice) - parseFloat(item.productPriceAfterDiscount))
                                          .toFixed(2)
                                          .toString();
                }
            }
        });
        component.set("v.results", resultsTab);
         component.find("toast").showInfo(
                                 $A.get("{!$Label.c.WDL_SubmitPricesToastInformation}"),
                                 $A.get("{!$Label.c.WDLC_CalculatedPrices}"));
    },
    doUpdatePriceAfterDiscount : function(component, event){
        let draftValues = event.getParam('draftValues');
                let res = component.get("v.results");
        if(component.get("v.isStandard")){
         res = component.get("v.results");
          res.forEach(item =>{
            if(item.productId == draftValues[0].productId){
                item.productPrice = parseFloat(draftValues[0].productPrice)
                                    .toFixed(2)
                                    .toString();
            }
          });
        }else{
         res = component.get("v.results");
        res.forEach(item => {
            if(item.productId == draftValues[0].productId){
                item.productPriceAfterDiscount =(parseFloat(item.productPrice)- parseFloat(draftValues[0].discountAmount).toFixed(2))
                                                .toString();
            }
        });
        }
        component.find("toast").showInfo($A.get("$Label.c.WDL_SubmitPricesToastInformation"),
                                         $A.get("$Label.c.WDLC_CalculatedPrices"));
        component.set("v.results", res);
    },
    doSubmitPrices : function(component, event){
        let res = component.get("v.results");
        let pricesMap = component.get("v.pricesToSet");
        if(!component.get("v.isStandard")){
            res.forEach(item => pricesMap[item.productId] = parseFloat(item.productPriceAfterDiscount));
            let submitDiscountsAction = component.get("c.addProductsToDiscount");
            submitDiscountsAction.setParams({
                'prices' : pricesMap,
                'pricebookName' : component.get("v.discount")
            });
            submitDiscountsAction.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    component.find("informationToast").openInformationToast(
                                                        $A.get("{!$Label.c.Success}"),
                                                        $A.get("{!$Label.c.Success}"),
                                                        $A.get("{!$Label.c.WDLC_PricesSubmitted}")
                    );
                    component.set("v.typeModal", 'successModal');
                    component.set("v.showModal",true);
                }else{
                }
            });
            $A.enqueueAction(submitDiscountsAction);
        }else{
            pricesMap = component.get("v.pricesToSet");
            res.forEach(item => pricesMap[item.productId] = parseFloat(item.productPrice));
            let submitStandard = component.get("c.setStandardPrices");
            submitStandard.setParams({
                'prices' : pricesMap
            });
            submitStandard.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    component.find("informationToast").openInformationToast(
                                                        $A.get("{!$Label.c.Success}"),
                                                        $A.get("{!$Label.c.Success}"),
                                                        $A.get("{!$Label.c.WDLC_PricesSubmitted}")
                    );
                    component.set("v.typeModal", 'successModal');
                    component.set("v.showModal",true);
                 }
            });
            $A.enqueueAction(submitStandard);
        }
    },
    doHandleRowAction : function(component, event){
        let action = event.getParam('action');
        let row = event.getParam('row');
        switch (action.name){
            case 'remove_item' :
                component.set("v.productsToRemove", Array.of(row.productId));
                component.set("v.typeModal", 'deleteItemsFromPricebook');
                component.set("v.showModal",true);
                break;
        }
    },
    doHandleSelection : function(component, event){
         let selectedRows = event.getParam('selectedRows');
         let productsToRemove = [];
         selectedRows.forEach(item => productsToRemove.push(item.productId));
         component.set("v.productsToRemove", productsToRemove);
    },
    doRefreshResults : function(component, event){
         let removedItems = event.getParam("products");
         let res = component.get("v.results");
         let resString = [];
         for(let i = 0; i< res.length; i++){
             resString.push(res[i].productId);
         }
         for (let i = 0; i < removedItems.length; i++){
            let ind = resString.indexOf(removedItems[i]);
            if(ind>=0){
                res.splice(ind,ind+1);
            }
         }
         component.set("v.results", res);
    },
    doSearchProducts : function(component, event){
         let resultsBeforeFilter = component.get("v.hiddenResults");
         let query = component.get("v.query");
         let resultsAfterFilter = resultsBeforeFilter
                .filter(item => item.productName.toUpperCase().startsWith(query.toUpperCase()));
         component.set("v.results", resultsAfterFilter);
    }
})