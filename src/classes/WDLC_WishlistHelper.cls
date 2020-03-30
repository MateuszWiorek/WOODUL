/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */

public with sharing class WDLC_WishlistHelper {

    public static Boolean addProductToWishlist(String productId) {
        WDLC_Wishlist__c wishlistedProduct = new WDLC_Wishlist__c(ProductId__c = productId);
        Database.SaveResult saveResult = Database.insert(wishlistedProduct);
        return (saveResult.isSuccess() ? true : false);
    }

    public static Boolean removeProductFromWishList(String productId) {
        WDLC_Wishlist__c element = [
                SELECT ProductId__c, CreatedById
                FROM WDLC_Wishlist__c
                WHERE
                CreatedById = :UserInfo.getUserId() AND ProductId__c = :productId
                LIMIT 1
        ];
        if (element != null) {
            try {
                Database.DeleteResult dr = Database.delete(element);
                return dr.isSuccess()?true:false;
            } catch (DmlException e) {
                throw new WDLC_CustomException(Label.WDLC_DeleteError);
            }
        } else {
            throw new WDLC_CustomException(Label.WDLC_DeleteError);
        }
    }
}