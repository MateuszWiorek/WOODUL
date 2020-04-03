/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_FurnitureProductCommentsController {
    @AuraEnabled
    public static Boolean addComment(Integer rating, String content, String productId) {
        return WDLC_FurnitureProductCommentsHelper.addComment(rating, content, productId);
    }
    @AuraEnabled
    public static List<WDLC_Comment__c> getComments(String productId){
        return WDLC_FurnitureProductCommentsHelper.getComments(productId);
    }
}