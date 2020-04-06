/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    addProductWithPriceToMap : function(component, event, helper){
        helper.doAddProductWithPriceToMap(component, event);
    },
    setPrices : function(component, event, helper){
        helper.doSetPrices(component, event);
    },
    searchItems : function(component, event, helper){
        helper.doSearchItems(component, event);
    },
    refreshMap : function(component, event, helper){
        helper.doRefreshMap(component,event);
    }
})