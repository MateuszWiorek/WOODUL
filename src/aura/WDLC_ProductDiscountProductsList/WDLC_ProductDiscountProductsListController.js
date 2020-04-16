/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    onInit: function(component, event, helper){
        helper.doOnInit(component, event);
    },
    addProductWithPriceToMap : function(component, event, helper){
        helper.doAddProductWithPriceToMap(component, event);
    },
    setPrices : function(component, event, helper){
        helper.doSetPrices(component, event);
    },
    searchItems : function(component, event, helper){
        helper.doSearchItems(component, event);
    }
})