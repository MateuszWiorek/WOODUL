/**
 * Created by Mateusz Wiorek on 01.04.2020.
 */
({
    refreshLivePhoto : function(component, event){
        console.log(component.get("v.photoUrl"));
        let compEvent = component.getEvent("changeLiveEvent");
        compEvent.setParams({
            'source' : component.get("v.photoUrl")
        });
        console.log(compEvent);
        compEvent.fire();
    }
})