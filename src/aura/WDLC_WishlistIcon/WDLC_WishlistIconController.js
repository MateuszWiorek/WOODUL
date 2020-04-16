/**
 * Created by Mateusz Wiorek on 30.03.2020.
 */
({
    goToObserved : function(component, event){
        console.log('cc');
        let orderAddress = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/wishlist';
        window.open(orderAddress, '_top');
    }
})