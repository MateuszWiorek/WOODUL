({
    findAccounts: function(component, event, helper){
        helper.doFindAccounts(component, event);
    },

    clear:function(component, event, helper){
        helper.doClear(component, event);
    },
    handleRefresh : function(component, event, helper){
        helper.doFindAccounts(component, event);
    }
})