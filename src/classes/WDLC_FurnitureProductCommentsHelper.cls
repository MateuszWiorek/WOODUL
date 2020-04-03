/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_FurnitureProductCommentsHelper {
    public static Boolean addComment(Integer rating, String commentMessage, String productId) {
        if(checkIfUserAlreadyCommentProduct(productId)){
            throw new WDLC_CustomException(Label.WDLC_CommentDuplicate);
        }
        if(String.isEmpty(commentMessage) || (rating == 0 || rating == null)){
            throw new WDLC_CustomException(Label.WDLC_RateAndComment);
        }
        WDLC_Comment__c comment = new WDLC_Comment__c();
        comment.CommentMessage__c = commentMessage;
        comment.Rating__c = rating;
        comment.Product__c = productId;
        Database.SaveResult saveResult = Database.insert(comment);
        if(saveResult.isSuccess()){
            return true;
        }else{
            throw new WDLC_CustomException(saveResult.getErrors().get(0).getMessage());
        }
    }
    public static List<WDLC_Comment__c> getComments(String productId) {
        List<WDLC_Comment__c> comments = [
                SELECT Name, CommentMessage__c, Rating__c, Product__c, createdByUser__c, createdDate__c, CreatedById
                FROM WDLC_Comment__c
                WHERE Product__c = :productId
        ];
        return comments;
    }
    private static Boolean checkIfUserAlreadyCommentProduct(String productId) {
        List<WDLC_Comment__c> comments = [
                SELECT createdByUser__c, CreatedById, Product__c
                FROM WDLC_Comment__c
                WHERE Product__c = :productId AND createdByUser__c =:UserInfo.getUserId()];
        return(!comments.isEmpty());
    }
}