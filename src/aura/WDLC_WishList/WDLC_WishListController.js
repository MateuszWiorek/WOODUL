/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */
({
    doInit: function(component, event, helper){
        helper.doDoInit(component,event);
    },
    goToObserved : function(component, event){
        let orderAddress = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/wishlist';
        window.open(orderAddress, '_top');
    }
})