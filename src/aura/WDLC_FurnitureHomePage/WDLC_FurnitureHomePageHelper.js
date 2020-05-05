/**
 * Created by Mateusz Wiorek on 27.03.2020.
 */
({
    goToSearch : function(component, event){
        let urlToProduct = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/store?searchItem='+
        component.get("v.productName");
        window.open(urlToProduct, '_top');
    }
})