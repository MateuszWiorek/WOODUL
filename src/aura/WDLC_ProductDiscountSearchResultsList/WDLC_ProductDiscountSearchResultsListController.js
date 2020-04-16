/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */
({
    onInit : function(component, event, helper){
        component.set("v.columns",[
            {label: 'Name', fieldName: 'productName', type : 'String', editable: true},
            {label: 'Unit Price', fieldName: 'productPrice', type : 'String', editable: true},
            {label: 'Price after discount', fieldName: 'productPriceAfterDiscount', type : 'String', editable: true},
            {label: 'Description', fieldName: 'productDescription', type : 'String', editable: true},
        ]);
        helper.doOnInit(component,event);
    },
    refreshPrice : function(component, event, helper){
        helper.doRefreshPrice(component, event);
    },
    showNewPrice : function(component, event, helper){
        helper.doShowNewPrice(component, event);
    },
    setNewPrices : function(component, event, helper){
        helper.doSetNewPrices(component, event);
    },
    refreshMap : function(component, event, helper){
        helper.doRefreshMap(component, event);
    },
    getDisc : function(component, event, helper){
        helper.doGetDisc(component, event);
    },
    showDiscountDetails : function(component, event, helper){
        helper.doShowDiscountDetails(component,event);
    },
    getItems : function (component, event, helper){
        helper.doGetItems(component, event);
    }
})