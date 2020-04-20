/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */

public with sharing class WDLC_SimilarProductsHelper {
    public static List<WDLC_ProductWrapper> getSimilarProducts(String productId) {
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        Product2 prod2 = [SELECT Id, Name FROM Product2 WHERE Id = :productId];
        List<String> productNames = prod2.Name.split(' ');
        String query = 'SELECT Id, Name, Description, photoUrl__c, ProductCode FROM Product2' +
                ' WHERE Name LIKE \'%' + productNames.get(0) + '%\'' +
                (productNames.size()>1 ? ' OR Name LIKE \'%'+productNames.get(1)+'%\'' : '' );

        List<Product2> similarProducts = Database.query(query);

        Set<String> productsIds = new Set<String>();
        for (Product2 prod : similarProducts) {
            productsIds.add(prod.Id);
        }

        List<PricebookEntry> pricebookEntries = [
                SELECT Name, Pricebook2Id, Product2Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2Id IN
                        :productsIds
        ];

        for (Product2 prod : similarProducts) {
            for (PricebookEntry entry : pricebookEntries) {
                if (prod.Id == entry.Product2Id) {
                    wrappedProducts.add(new WDLC_ProductWrapper(String.valueOf(prod.Id), prod.Name, prod.Description, prod.ProductCode, prod.photoUrl__c, String.valueOf(entry.UnitPrice)));
                }
            }
        }
        return wrappedProducts;
    }
}