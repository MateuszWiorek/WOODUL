/**
 * Created by Mateusz Wiorek on 05.04.2020.
 */
({
    onInit :function(component,event,helper){
        helper.doOnInit(component, event);
    },
    refreshMap : function(component, event, helper){
        helper.doRefreshMap(component, event);
    },
    openModal : function(component, event){
        component.set("v.canBeShown", true);
    }
})