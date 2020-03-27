/**
 * Created by Mateusz Wiorek on 25.03.2020.
 */

public with sharing class WDLC_ProductTileController {
    @AuraEnabled
    public static Boolean addToFavorite(String productId){
        return WDLC_WishlistController.addToWishlist(productId);
    }
    @AuraEnabled
    public static void addToBasket(String productId){
        WDLC_BasketController.addProductToBasket(productId);
    }
}