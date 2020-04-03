/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */

public with sharing class WDLC_SearchProductsController {
    @AuraEnabled public static List<WDLC_ProductWrapper> findProducts(String name){
        return WDLC_SearchProductsHelper.findProducts(name);
    }
}