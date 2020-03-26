/**
 * Created by Mateusz Wiorek on 26.03.2020.
 */
({
        doInit : function(component, event, helper){
          helper.doOnInit(component, event);
      },
      refreshTable : function(component, event, helper){
          helper.doRefreshTable(component, event);
      },
      goToOrder : function(component, event, helper){
          helper.doGoToOrder(component, event);
      }
})