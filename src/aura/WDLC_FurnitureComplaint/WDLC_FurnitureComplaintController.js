/**
 * Created by Mateusz Wiorek on 26.03.2020.
 */
({
    onInit : function(component, event, helper){
        helper.onInit(component, event);
    },
    postComment : function(component, event, helper){
        helper.postComment(component, event);
        helper.onInit(component,event);
    }
})