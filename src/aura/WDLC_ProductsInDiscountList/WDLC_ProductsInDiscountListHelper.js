/**
 * Created by Mateusz Wiorek on 08.04.2020.
 */
({
    onInit : function(component, event){
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
                                 let resultsAfterFilter = resultsBeforeFilter
                                        .filter(item => !selectedList.has(item.productId));
                                 component.set("v.results", resultsAfterFilter);
                            }else{
                                component.find("toast").showError(response);
                            }
                         });
                         $A.enqueueAction(searchActions);
                    }else{
                         component.find("toast").showError(response);
                    }
                 });
                 $A.enqueueAction(getItemsAction);
            }else{
                component.find("toast").showError(response);
            }
        });
        $A.enqueueAction(getItemsInDiscount);
    },
    searchProducts : function(component, event){
         let searchActions = component.get("c.findProducts");
         searchActions.setParams({
             "name" : component.get("v.query")
         });
         searchActions.setCallback(this, function(response){
             if(response.getState() === "SUCCESS"){
                 let selectedList = new Set(component.get("v.selectedProducts"));
                 let resultsBeforeFilter = response.getReturnValue();
                 let resultsAfterFilter = resultsBeforeFilter
                        .filter(item => !selectedList.has(item.productId));
                 component.set("v.results", resultsAfterFilter);
             }else{
                 component.find("toast").showError(response);
             }
         });
         $A.enqueueAction(searchActions);
    },
    refreshResults : function(component, event){
        let removed = event.getParam("products");
        let removedList = [];
        for(let i = 0; i< removed.length; i++){
            removedList.push(removed[i]);
        }
        let selectedList = Array.from(component.get("v.selectedProducts"));
        let selectedListAfterRefresh = [];
         for (let i = 0; i < removedList.length; i++){
            let ind = selectedList.indexOf(removedList[i]);
            if(ind>=0){
                selectedList.splice(ind,ind+1);
            }
         }
        let selectedSet = new Set(selectedList);
        component.set("v.selectedProducts", Array.from(selectedSet));
        helper.searchProducts(component, event);
    },
    handleAction : function(component, event, helper){
        let action = event.getParam('action');
        let row = event.getParam('row');
        console.log(row.productId);
        switch (action.name){
            case 'add_item' :
                 let selectedList = component.get("v.selectedProducts");
                 let selectedSet = new Set(selectedList);
                 selectedSet.add(row.productId);
                 component.set("v.selectedProducts", selectedSet);
                 let setDetailsEvent = $A.get("e.c:WDLC_SendProductsList");
                 setDetailsEvent.setParams({
                      "products" : Array.from(component.get("v.selectedProducts")),
                      "discount" : component.get("v.discountName")
                 });
                 setDetailsEvent.fire();
                 helper.searchProducts(component, event);
            break;
        }
    },
    setDetails : function(component, event){
        let setDetailsEvent = $A.get("e.c:WDLC_SendProductsList");
        setDetailsEvent.setParams({
            "products" : Array.from(component.get("v.selectedProducts")),
            "discount" : component.get("v.discountName")
        });
        setDetailsEvent.fire();
    },
    updateSelectedText : function(component, event){
         var selectedRows = event.getParam('selectedRows');
         let selectedList = component.get("v.selectedProducts");
         let selectedSet = new Set(selectedList);
         selectedRows.forEach(function(item){
             selectedSet.add(item.productId);
         });
         component.set("v.selectedProducts", selectedSet);
    }
})