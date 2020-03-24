/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */

public with sharing class WDLC_ProductViewController {
    @AuraEnabled
    public static WDLC_ProductWrapper getProduct(String productId){
        return WDLC_ProductViewHelper.getProduct(productId);
    }
    @AuraEnabled
    public static void addProductToBasket(String productId){
        WDLC_BasketController.addProductToBasket(productId);
    }
    @AuraEnabled
    public static void addProductToWishList(String productId){
        WDLC_WishlistController.addToWishList(productId);
    }
}