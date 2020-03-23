/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */

public with sharing class WDLC_ProductViewHelper {
    public static WDLC_ProductWrapper getProduct(String productId) {
        WDLC_ProductWrapper wrappedProduct;
        Product2 product = [
                SELECT Name, ProductCode, Description, photoUrl__c
                FROM Product2
                WHERE Id = :productId
                LIMIT 1
        ];

        PricebookEntry pricebookEntry = [
                SELECT Product2Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :product.Id
                LIMIT 1
        ];

        if (product != null && pricebookEntry != null) {
            wrappedProduct = new WDLC_ProductWrapper(String.valueOf(product.Id), product.Name, product.Description,
                    product.ProductCode, product.photoUrl__c, String.valueOf(pricebookEntry.UnitPrice));
        }

        return wrappedProduct;
    }
}