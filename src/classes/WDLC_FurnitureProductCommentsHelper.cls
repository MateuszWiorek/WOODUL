/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_FurnitureProductCommentsHelper {
    public static Boolean addComment(Integer rating, String commentMessage, String productId) {
        WDLC_Comment__c comment = new WDLC_Comment__c();
        comment.CommentMessage__c = commentMessage;
        comment.Rating__c = rating;
        comment.Product__c = productId;
        Database.SaveResult saveResult = Database.insert(comment);
        return (saveResult.isSuccess() ? true : false);
    }
    public static List<WDLC_Comment__c> getComments(String productId) {
        List<WDLC_Comment__c> comments = [
                SELECT Name, CommentMessage__c, Rating__c, Product__c
                FROM WDLC_Comment__c
                WHERE Product__c = :productId
        ];
        return comments;
    }
}