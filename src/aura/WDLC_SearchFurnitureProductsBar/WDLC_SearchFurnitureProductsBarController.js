/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    sendData: function(component, event, helper){
        helper.doSendData(component,event);
    },
    clear : function(component, event, helper){
        helper.doClear(component, event);
    },
        keyCheck : function(component, event, helper){
            if(event.getParams().keyCode == 13){
                helper.doSendData(component, event);
            }
        },
})