({
    findAccounts: function(component, event, helper){
        helper.findAccounts(component, event);
    },

    clear:function(component, event, helper){
        helper.clear(component, event);
    },
    handleRefresh : function(component, event, helper){
        helper.findAccounts(component, event);
    }
})