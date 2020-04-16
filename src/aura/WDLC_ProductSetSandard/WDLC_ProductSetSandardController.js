/**
 * Created by Mateusz Wiorek on 09.04.2020.
 */
({
    onInit : function(component, event, helper){
        component.set("v.columns",[
            {label: $A.get("{!Label.c.WDLC_Name}"), fieldName: 'productName', type : 'String', editable: false},
            {label: $A.get("{!Label.c.WDLC_StandardPrice}"), sortable: true,  fieldName: 'productPrice', type : 'String',
                                    placeholder: $A.get("{!$Label.c.WDLC_StandardPricePlaceholder}"), editable: true}
        ]);
        helper.doOnInit(component, event);
    },
    handleSettingStandardPrices : function(component, event){
        helper.doHandleSettingStandardPrices(component,event);
    },
    handleSubmit : function(component, event, helper){
        helper.doHandleSubmit(component, event);
    },
    searchProducts : function(component, event, helper){
        helper.doSearchProducts(component,event);
    }
})