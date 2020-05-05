/**
 * Created by Mateusz Wiorek on 03.04.2020.
 */
({
    showDetails : function(component, event, helper){
        helper.showDetails(component, event);
    },
    openModal : function(component, event){
        component.set("v.canBeShown", true);
    },
    editDiscount : function(component, event, helper){
        helper.editDiscount(component, event);
    }
})