/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */
({
        doInit : function(component, event, helper){
          helper.doOnInit(component, event);
      },
      refreshTable : function(component, event, helper){
          console.log('da');
          helper.doRefreshTable(component, event);
      },
      goToOrder : function(component, event, helper){
          helper.doGoToOrder(component, event);
      },
      orderWithDefaultAddress : function(component, event, helper){
          helper.doOrderWithDefaultAddress(component,event);
      },
      goToObserved : function(component, event){
        let orderAddress = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/wishlist';
        window.open(orderAddress, '_top');
      }
})