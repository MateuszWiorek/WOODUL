/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
     doInit : function(component, event, helper) {
         let meta = document.createElement("meta");
         meta.setAttribute("name", "format-detection");
         meta.setAttribute("http-equiv", "Content-Security-Policy")
         meta.setAttribute("content", "date=no;img-src 'self' data:");
         document.getElementsByTagName('head')[0].appendChild(meta);
        helper.doOnInit(component,event);
     },
     goNextPage: function(component,event,helper){
         component.set("v.productsToShowStart", component.get("v.productsToShowStart") + component.get("v.productsToShow"));
         component.set("v.productsToShowEnd", component.get("v.productsToShowEnd") + component.get("v.productsToShow"));
     },
     goPreviousPage: function(component, event, helper){
         component.set("v.productsToShowStart", component.get("v.productsToShowStart") - component.get("v.productsToShow"));
         component.set("v.productsToShowEnd", component.get("v.productsToShowEnd") - component.get("v.productsToShow"));
     },
     changeShowItemsValue:function(component,event, helper){
         component.set("v.productsToShow", component.find("selectProductsCounter").get("v.value"));
         component.set("v.productsToShowEnd", component.get("v.productsToShowStart") + component.get("v.productsToShow"));
     },
     sortByPrice:function(component, event, helper){
         component.set("v.hideSpinner", false);
         let res = component.get("v.results");
         let sortType = component.find("selectSortType").get("v.value");
         if(sortType == 'Price asc'){
            res.sort((a,b) => (parseFloat(a.productPriceAfterDiscount) > parseFloat(b.productPriceAfterDiscount)) ? 1 : -1);
         }else if(sortType == 'Price desc'){
            res.sort((a,b) => (parseFloat(a.productPriceAfterDiscount) < parseFloat(b.productPriceAfterDiscount)) ? 1 : -1);
         }else if(sortType == 'Name asc'){
            res.sort((a,b) => (a.productName > b.productName) ? 1 : -1);
         }else if(sortType == 'Name desc'){
            res.sort((a,b) => (a.productName < b.productName) ? 1 : -1);
         }
         console.log(res);
         component.set("v.results", res);
         component.set("v.hideSpinner", true);
     },
     waiting: function(component, event, helper) {
       component.set("v.hideSpinner", true);
     },
     doneWaiting: function(component, event, helper) {
       component.set("v.hideSpinner", false);
     }
})