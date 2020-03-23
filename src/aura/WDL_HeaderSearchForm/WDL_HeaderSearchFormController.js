/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */
({
    newAccount: function(component,event,helper){
    var buttonAdd = component.find("buttonNew").getElement();
    buttonAdd.onclick(alert("TODO"));
    },
    getMessage: function(component, event, helper){
        return "Divisions";
    }
})