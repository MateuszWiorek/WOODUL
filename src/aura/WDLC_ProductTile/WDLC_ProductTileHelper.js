/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */
({
    doSendFurnitureIdToProductView : function(component, event){
        let productToSend = component.get("v.product");
        let productToSendId = productToSend.productId;
        let eUrl = $A.get("e.force:navigateToURL");
        let productNameToUrl = productToSend.productName.toLowerCase().replace(' ','-');
        let urlToProduct = 'https://woodul-developer-edition.eu32.force.com/furnitureservice/s/product/'
        + productNameToUrl +'/'+productToSendId;
        console.log(urlToProduct);
        window.open(urlToProduct, '_top');
    }
})