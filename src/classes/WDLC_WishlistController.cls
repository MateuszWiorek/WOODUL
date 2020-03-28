/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */

public with sharing class WDLC_WishlistController {

    @AuraEnabled
    public static Boolean addToWishlist(String productId){
        return WDLC_WishlistHelper.addProductToWishlist(productId);
    }
    @AuraEnabled
    public static List<Product2> getWishlistedProducts(){
        return WDLC_WishlistHelper.getWishlistedProducts();
    }
}