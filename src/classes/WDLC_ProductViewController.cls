/**
 * Created by Mateusz Wiorek on 23.03.2020.
 */

public with sharing class WDLC_ProductViewController {
    @AuraEnabled
    public static WDLC_ProductWrapper getProduct(String productId){
        return WDLC_ProductViewHelper.getProduct(productId);
    }
}