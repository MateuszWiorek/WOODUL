/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    setPrice : function(component, event, helper){
        helper.setPrice(component, event);
    },
    changePrice : function(component, event, helper){
        helper.changePrice(component, event);
    },
    onInit : function(component, event){
        let product = component.get("v.product")
        component.set("v.product", product);
    },
    markToDiscount : function(component, event, helper){
        helper.markToDiscount(component, event);
    }
})