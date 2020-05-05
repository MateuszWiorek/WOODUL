/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
     doInit : function(component, event, helper) {
         let meta = document.createElement("meta");
         meta.setAttribute("name", "format-detection");
         meta.setAttribute("http-equiv", "Content-Security-Policy")
         meta.setAttribute("content", "date=no;img-src 'self' data:");
         document.getElementsByTagName('head')[0].appendChild(meta);
         if(component.get("v.product").productPrice != component.get("v.product").productPriceAfterDiscount){
             $A.util.addClass(component.find("standardPrice"), 'standardPrice');
             $A.util.addClass(component.find("discountPrice"), 'discountPrice');
             $A.util.removeClass(component.find("discountPrice"), 'discountPriceNone');
         }
     },
     sendFurnitureIdToProductView : function(component, event, helper){
         helper.sendFurnitureIdToProductView(component, event);
     },
     addToObserved : function(component, event, helper){
         helper.addToFavorite(component, event);
     },
     buyNow : function(component, event, helper){
         helper.addToOrder(component, event);
     }
})