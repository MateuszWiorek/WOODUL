/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    comment: function(component, event, helper){
        helper.doComment(component,event);
        helper.doInit(component,event);
    },
    onInit: function(component,event,helper){
        helper.doInit(component, event);
    },
    rate : function(component, event){
        console.log(event.getParam("ratingProduct"));
        component.set("v.ratingGrade", event.getParam("ratingProduct"));
    }
})