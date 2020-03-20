/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    comment: function(component, event, helper){
        helper.doComment(component,event);
    },
    onInit: function(component,event,helper){
        helper.doInit(component, event);
    }
})