/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */

public with sharing class WDLC_WishlistHelper {

    public static Boolean addProductToWishlist(String productId) {
        WDLC_Wishlist__c wishlistedProduct = new WDLC_Wishlist__c(ProductId__c = productId);
        Database.SaveResult saveResult = Database.insert(wishlistedProduct);
        return (saveResult.isSuccess() ? true : false);
    }

    public static List<WDLC_ProductWrapper> getWishlistedProducts() {
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        List<WDLC_Wishlist__c> wishlist = [
                SELECT ProductId__c, CreatedById
                FROM WDLC_Wishlist__c
                WHERE
                        CreatedById = :UserInfo.getUserId()
        ];
        Set<Id> wishlistedIds = new Set<Id>();
        System.debug(wishlistedIds);
        for (WDLC_Wishlist__c element : wishlist) {
            wishlistedIds.add(element.ProductId__c);
        }
        System.debug(wishlistedIds);
        List<Product2> products = [
                SELECT Name, Description, photoUrl__c, ProductCode, StockKeepingUnit, QuantityUnitOfMeasure
                FROM Product2
                WHERE Id IN :wishlistedIds
        ];
        List<PricebookEntry> pricebookEntries = [
                SELECT Name, Pricebook2Id, Product2Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2Id IN
                        :wishlistedIds
        ];
        for (Product2 prod : products) {
            for (PricebookEntry entry : pricebookEntries) {
                if (prod.Id == entry.Product2Id) {
                    wrappedProducts.add(new WDLC_ProductWrapper(String.valueOf(prod.Id), prod.Name, prod.Description,
                            prod.ProductCode, prod.photoUrl__c, String.valueOf(entry.UnitPrice)));
                }
            }
        }
        return wrappedProducts;
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