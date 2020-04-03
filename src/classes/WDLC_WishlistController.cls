/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */

public with sharing class WDLC_WishlistController {

    @AuraEnabled
    public static Boolean addToWishlist(String productId){
        return WDLC_WishlistHelper.addProductToWishlist(productId);
    }
    @AuraEnabled
    public static List<WDLC_ProductWrapper> getWishlistedProducts(){
        return WDLC_ProductHelper.getWishlistedProducts();
    }
    @AuraEnabled
    public static Boolean removeFromWishList(String productId){
        return WDLC_WishlistHelper.removeProductFromWishList(productId);
    }
}