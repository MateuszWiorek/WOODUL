/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_SimilarProductsController {

    @AuraEnabled
    public static List<Product2> getSimilarProducts(String productId){
        return WDLC_SimilarProductsHelper.getSimilarProducts(productId);
    }
}