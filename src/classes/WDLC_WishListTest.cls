/**
 * Created by Mateusz Wiorek on 19.03.2020.
 */
@IsTest
public with sharing class WDLC_WishListTest {
    @TestSetup
    public static void setup() {
        Product2 prod = new Product2(Name = 'Chair', Description = 'chairB');
        Product2 prod2 = new Product2(Name = 'Chair2', Description = 'chairB');
        List<Product2> product2s = new List<Product2>();
        product2s.add(prod);
        product2s.add(prod2);
        insert product2s;
    }

    @IsTest
    public static void shouldAddProductToWishlist() {
        Product2 prod = [SELECT Id, Name FROM Product2 WHERE Name = 'Chair2' LIMIT 1];
        Test.startTest();
        Boolean isDone = WDLC_WishlistController.addToWishlist(String.valueOf(prod.Id));
        Test.stopTest();
        List<WDLC_Wishlist__c> results = [SELECT Id FROM WDLC_Wishlist__c];
        System.assertEquals(1, results.size());
    }

    @IsTest
    public static void shouldgetListOfResults() {
        List<WDLC_Wishlist__c> results = [SELECT Id FROM WDLC_Wishlist__c];
        System.assertEquals(0, results.size());
        List<Product2> products = [SELECT Id, Name From Product2 WHERE Name LIKE '%Chair%'];
        Test.startTest();
        for(Product2 element : products){
            WDLC_WishlistController.addToWishlist(String.valueOf(element.Id));
        }
        List<Product2> resultAfterAdding = WDLC_WishlistController.getWishlistedProducts();
        Test.stopTest();
        System.assertEquals(2, resultAfterAdding.size());
    }
}