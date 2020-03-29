/**
 * Created by Mateusz Wiorek on 29.03.2020.
 */
({
    onInit : function(component){
        console.log('inside');
        component.set("v.userId", $A.get("$SObjectType.CurrentUser.Id"));
        console.log($A.get("$SObjectType.CurrentUser.Id"));
    }
})