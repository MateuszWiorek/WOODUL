/**
 * Created by Mateusz Wiorek on 01.04.2020.
 */
({
    refreshLivePhoto : function(component, event){
        let compEvent = component.getEvent("changeLiveEvent");
        compEvent.setParams({
            'source' : component.get("v.photoUrl")
        });
        compEvent.fire();
    }
})