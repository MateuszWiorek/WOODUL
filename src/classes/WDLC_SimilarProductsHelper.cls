/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_SimilarProductsHelper {
    public static List<Product2> getSimilarProducts(String productId) {
        Product2 prod = [SELECT Id, Name FROM Product2 WHERE Id = :productId];
        List<String> productNames = prod.Name.split(' ');
        String query = 'SELECT Id, Name, Description, photoUrl__c FROM Product2' +
                ' WHERE Name LIKE \'%' + productNames.get(0) + '%\'' +
                (productNames.size()>1 ? ' OR Name LIKE \'%'+productNames.get(1)+'%\'' : '' );

        List<Product2> similarProducts = Database.query(query);
        return similarProducts;
    }
}