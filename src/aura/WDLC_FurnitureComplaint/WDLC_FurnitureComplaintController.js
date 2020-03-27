/**
 * Created by Mateusz Wiorek on 26.03.2020.
 */
({
    onInit : function(component, event, helper){
        console.log('on init');
        helper.doOnInit(component, event);
    },
    postComment : function(component, event, helper){
        helper.doPostComment(component, event);
        helper.doOnInit(component,event);
    }
})