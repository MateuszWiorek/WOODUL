/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    doOnInit : function(component, event, helper){
        component.set("v.discountName", event.getParam("pricebookId"));
        let getItemsInDiscount = component.get("c.getDiscountId");
        getItemsInDiscount.setParams({
            "name": event.getParam("pricebookId")
        });
        getItemsInDiscount.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.canBeShown", true);
                let getItemsAction = component.get("c.getProductsInDiscount");
                getItemsAction.setParams({
                    "discountId" : response.getReturnValue(),
                    "page" : 1
                });
                getItemsAction.setCallback(this, function(response){
                    if(response.getState() === "SUCCESS"){
             var selectedRows = response.getReturnValue();
             let selectedList = component.get("v.selectedProducts");
             let selectedSet = new Set();
             selectedRows.forEach(function(item){
                 selectedSet.add(item.productId);
             });
             component.set("v.selectedProducts", selectedSet);
                             let searchActions = component.get("c.findProducts");
                             searchActions.setParams({
                                 "name" : ' '
                             });
                             searchActions.setCallback(this, function(response){
                                 if(response.getState() === "SUCCESS"){
                                     let selectedList = new Set(component.get("v.selectedProducts"));
                                     let resultsBeforeFilter = response.getReturnValue();
                                     let resultsAfterFilter = resultsBeforeFilter.filter(item => !selectedList.has(item.productId));
                                     component.set("v.results", resultsAfterFilter);
                                 }
                             });
                             $A.enqueueAction(searchActions);

                    }
                });
                $A.enqueueAction(getItemsAction);
            }
        });
        $A.enqueueAction(getItemsInDiscount);
    },
    doSearchProducts : function(component, event){
                let searchActions = component.get("c.findProducts");
                searchActions.setParams({
                    "name" : component.get("v.query")
                });
                searchActions.setCallback(this, function(response){
                    if(response.getState() === "SUCCESS"){
                        let selectedList = new Set(component.get("v.selectedProducts"));
                        let resultsBeforeFilter = response.getReturnValue();
                        let resultsAfterFilter = resultsBeforeFilter.filter(item => !selectedList.has(item.productId));
                        component.set("v.results", resultsAfterFilter);
                    }
                });
                $A.enqueueAction(searchActions);
    }
})