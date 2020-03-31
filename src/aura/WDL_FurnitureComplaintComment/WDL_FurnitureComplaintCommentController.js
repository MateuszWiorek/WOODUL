/**
 * Created by Mateusz Wiorek on 29.03.2020.
 */
({
    onInit : function(component){
        component.set("v.userId", $A.get("$SObjectType.CurrentUser.Id"));
    }
})