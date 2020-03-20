/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

@IsTest
public with sharing class WDLC_CommentsTest {
    @TestSetup
    public static void setup() {
        Product2 prod = new Product2(Name = 'testProd');
        Database.insert(prod);
    }

    @IsTest
    public static void shouldAddCommentToProduct() {
        Product2 prod = [SELECT Id, Name FROM Product2 WHERE Name = 'testProd'];
        Test.startTest();
        WDLC_FurnitureProductComments.addComment(5, 'The best product ever', String.valueOf(prod.Id));
        Test.stopTest();
        List<WDLC_Comment__c> results = [
                SELECT Id, Product__c, Rating__c, CommentMessage__c
                FROM WDLC_Comment__c
                WHERE Product__c = :prod.Id AND Rating__c = 5
        ];
        System.assertEquals(1, results.size());
        System.assertEquals('The best product ever', results.get(0).CommentMessage__c);

    }

    @IsTest
    public static void shouldReturnComments() {
        Product2 prod = [SELECT Id, Name FROM Product2 WHERE Name = 'testProd'];
        List<WDLC_Comment__c> comments = new List<WDLC_Comment__c>();
        WDLC_Comment__c com = new WDLC_Comment__c();
        com.Product__c = prod.Id;
        WDLC_Comment__c com2 = new WDLC_Comment__c();
        com2.Product__c = prod.Id;
        comments.add(com);
        comments.add(com2);
        insert comments;
        Test.startTest();
        List<WDLC_Comment__c> results = WDLC_FurnitureProductComments.getComments(String.valueOf(prod.Id));
        Test.stopTest();
        System.assertEquals(2, results.size());
    }
}