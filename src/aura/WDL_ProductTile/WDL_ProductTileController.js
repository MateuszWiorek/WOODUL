/**
 * Created by Mateusz Wiorek on 16.03.2020.
 */
({
    doInit: function(component, event, helper){
        let product = {
            Name: 'Jabadabadu',
            photoUrl : 'https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0727320_PE735593_S5.JPG?f=s'
        };
        component.set("v.product", product);
    }
})