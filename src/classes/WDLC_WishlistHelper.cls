/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */

public with sharing class WDLC_WishlistHelper {

    public static Boolean addProductToWishlist(String productId) {
        WDLC_Wishlist__c wishlistedProduct = new WDLC_Wishlist__c(ProductId__c = productId);
        Database.SaveResult saveResult = Database.insert(wishlistedProduct);
        return (saveResult.isSuccess() ? true : false);
    }

    public static List<Product2> getWishlistedProducts() {
        List<WDLC_Wishlist__c> wishlist = [SELECT ProductId__c FROM WDLC_Wishlist__c];
        Set<Id> wishlistedIds = new Set<Id>();
        for (WDLC_Wishlist__c element : wishlist) {
            wishlistedIds.add(element.ProductId__c);
        }
        List<Product2> products = [
                SELECT Name, Description, photoUrl__c, ProductCode, StockKeepingUnit, QuantityUnitOfMeasure
                FROM Product2
                WHERE Id IN :wishlistedIds
        ];
        return products;
    }
}