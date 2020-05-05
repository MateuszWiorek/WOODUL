/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    handleProductId : function(component, event, helper){
        helper.doHandleProductId(component, event);
    },
    doInit : function(component, event, helper){
        helper.doOnInit(component,event);
    },
    addToCart : function(component, event, helper){
        helper.doAddToCart(component,event);
    },
    addToWishList : function(component, event, helper){
        helper.doAddToWishList(component, event);
    },
    removeFromObserved : function(component, event, helper){
        helper.doRemoveFromList(component, event);
    },
    setLivePhoto : function(component, event){
        component.set("v.livePhoto", event.getParam('source'));
    },
    incrementCounter : function(component, event, helper){
        component.set("v.counter", component.get("v.counter")+1);
    },
    decrementCounter : function(component, event, helper){
        component.set("v.counter", component.get("v.counter")-1);
    },
    openComparingModal : function(component){
        component.set("v.showCompareModal", true);
    }
})