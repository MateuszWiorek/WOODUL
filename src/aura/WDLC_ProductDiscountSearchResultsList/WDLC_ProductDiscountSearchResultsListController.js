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
        helper.onInit(component,event);
    },
    refreshPrice : function(component, event, helper){
        helper.refreshPrice(component, event);
    },
    showNewPrice : function(component, event, helper){
        helper.showNewPrice(component, event);
    },
    setNewPrices : function(component, event, helper){
        helper.setNewPrices(component, event);
    },
    refreshMap : function(component, event, helper){
        helper.refreshMap(component, event);
    },
    getDisc : function(component, event, helper){
        helper.getDisc(component, event);
    },
    showDiscountDetails : function(component, event, helper){
        helper.showDiscountDetails(component,event);
    },
    getItems : function (component, event, helper){
        helper.getItems(component, event);
    }
})