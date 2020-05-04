/**
 * Created by Mateusz Wiorek on 27.03.2020.
 */
({
    doGoToSearch : function(component, event){
        let urlToProduct = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/store?searchItem='+
        component.get("v.productName");
        window.open(urlToProduct, '_top');
    }
})