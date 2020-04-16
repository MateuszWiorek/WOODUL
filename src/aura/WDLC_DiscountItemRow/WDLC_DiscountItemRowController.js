/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    setPrice : function(component, event, helper){
        helper.doSetPrice(component, event);
    },
    changePrice : function(component, event, helper){
        helper.doChangePrice(component, event);
    },
    onInit : function(component, event){
    },
    markToDiscount : function(component, event, helper){
        helper.doMarkToDiscount(component, event);
    },
})