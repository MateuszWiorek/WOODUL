/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */
({
    incrementCounter : function(component,event,helper){
        helper.doIncrementCounter(component,event);
    },
    decrementCounter : function(component, event, helper){
        helper.doDecrementCounter(component,event);
    },
    removeProduct : function(component, event, helper){
        console.log('ha');
        helper.doRemoveProduct(component, event);
    },
    changeProductCounter : function(component, event, helper){
        helper.doChangeProductCounter(component, event);
    },
    onInit : function(component){
        console.log(component.get("v.cell"));
    }
})