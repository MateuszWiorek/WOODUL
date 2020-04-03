/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */

public with sharing class WDLC_SearchProductsHelper {
    public static List<WDLC_ProductWrapper> findProducts(String name){
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        String query = 'SELECT Name, ProductCode, Description, photoUrl__c '+
                'FROM Product2 '+
                'WHERE Name LIKE \'%' + name + '%\' AND' +
                ' recordtypeid in (SELECT Id' +
                ' FROM RecordType where sobjecttype = \'Product2\' and name = \'Furniture\')';
        List<Product2> products = Database.query(query);
        for(Product2 prod : products){
            wrappedProducts.add(new WDLC_ProductWrapper(prod.Name, prod.Description, prod.ProductCode, prod.photoUrl__c));
        }
        return wrappedProducts;
    }
}