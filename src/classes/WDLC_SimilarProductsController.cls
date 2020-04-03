/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_SimilarProductsController {

    @AuraEnabled
    public static List<WDLC_ProductWrapper> getSimilarProducts(String productId){
        return WDLC_ProductHelper.getSimilarProducts(productId);

    }
}