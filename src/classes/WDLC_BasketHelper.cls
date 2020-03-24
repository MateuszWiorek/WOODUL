/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_BasketHelper {

    public static void addProductToBasket(String id) {
        String cachedProducts;
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            cachedProducts = (String) sessionPartition.get('productsInBasket');
            if(!cachedProducts.contains(id)) {
                cachedProducts += ',' + id;
            }
        } else {
            cachedProducts = id;
        }
        sessionPartition.put('productsInBasket', cachedProducts);
    }
    public static List<WDLC_ProductWrapper> getProductsInBasket() {
        List<WDLC_ProductWrapper> wrappedProducts = new List<WDLC_ProductWrapper>();
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            String cachedProducts = (String) sessionPartition.get('productsInBasket');
            List<String> listOfCachedProducts = cachedProducts.split(',');
            List<Product2> products = [
                    SELECT
                            Description,
                            DisplayUrl,
                            Id,
                            Name,
                            photoUrl__c,
                            ProductCode
                    FROM Product2
                    WHERE Id IN :listOfCachedProducts
            ];
            List<PricebookEntry> pricebookEntries = [
                    SELECT Name, Pricebook2Id, Product2Id, UnitPrice
                    FROM PricebookEntry
                    WHERE Product2Id IN
                            :listOfCachedProducts
            ];
            for (Product2 prod : products) {
                for (PricebookEntry entry : pricebookEntries) {
                    if (prod.Id == entry.Product2Id) {
                        wrappedProducts.add(new WDLC_ProductWrapper(String.valueOf(prod.Id), prod.Name, prod.Description,
                                prod.ProductCode, prod.photoUrl__c, String.valueOf(entry.UnitPrice)));
                    }
                }
            }
            return wrappedProducts;
        } else {
            return wrappedProducts;
        }
    }
}