/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_BasketHelper {

    public static void addProductToBasket(String id) {
        String cachedProducts;
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            cachedProducts = (String) sessionPartition.get('productsInBasket');
            if (!cachedProducts.contains(id)) {
                cachedProducts += ',' + id + ':1';
            } else {
                Integer indexOfProduct = cachedProducts.indexOf(id);
                Integer counter = Integer.valueOf(cachedProducts.split('').get(indexOfProduct + 19));
                counter += 1;
                String newCachedProducts = cachedProducts.substring(0, indexOfProduct + 19) + counter +
                        cachedProducts.substring(indexOfProduct + 20);
                cachedProducts = newCachedProducts;
            }
        } else {
            cachedProducts = id + ':1';
        }
        sessionPartition.put('productsInBasket', cachedProducts);
    }
    public static List<WDLC_ProductToOrderWrapper> increaseProductCounter(String productId) {
        String cachedProducts;
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            cachedProducts = (String) sessionPartition.get('productsInBasket');
            if (cachedProducts.contains(productId)) {
                Integer indexOfProduct = cachedProducts.indexOf(productId);
                Integer counter = Integer.valueOf(cachedProducts.split('').get(indexOfProduct + 19));
                counter += 1;
                String newCachedProducts = cachedProducts.substring(0, indexOfProduct + 19) + counter +
                        cachedProducts.substring(indexOfProduct + 20);
                cachedProducts = newCachedProducts;
                sessionPartition.put('productsInBasket', cachedProducts);
            }
        }
        return getProductsInBasket();
    }
    public static List<WDLC_ProductToOrderWrapper> decreaseProductCounter(String productId) {
        String cachedProducts;
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            cachedProducts = (String) sessionPartition.get('productsInBasket');
            if (cachedProducts.contains(productId)) {
                Integer indexOfProduct = cachedProducts.indexOf(productId);
                Integer counter = Integer.valueOf(cachedProducts.split('').get(indexOfProduct + 19));
                counter -= 1;
                String newCachedProducts = cachedProducts.substring(0, indexOfProduct + 19) + counter +
                        cachedProducts.substring(indexOfProduct + 20);
                cachedProducts = newCachedProducts;
                sessionPartition.put('productsInBasket', cachedProducts);
            }
        }
        return getProductsInBasket();
    }
    public static List<WDLC_ProductToOrderWrapper> removeProduct(String productId) {
        String cachedProducts;
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            cachedProducts = (String) sessionPartition.get('productsInBasket');
            if (cachedProducts.contains(productId)) {
                Integer indexOfProduct = cachedProducts.indexOf(productId);
                Integer counter = Integer.valueOf(cachedProducts.split('').get(indexOfProduct + 19));
                String newCachedProducts = cachedProducts.substring(0, indexOfProduct) +
                        cachedProducts.substring(indexOfProduct + 21);
                cachedProducts = newCachedProducts;
                sessionPartition.put('productsInBasket', cachedProducts);
            }
        }
        return getProductsInBasket();
    }
    public static List<WDLC_ProductToOrderWrapper> getProductsInBasket() {
        List<String> listOfCachedProducts = new List<String>();
        List<WDLC_ProductToOrderWrapper> wrappedProductsToOrder = new List<WDLC_ProductToOrderWrapper>();

        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        if (sessionPartition.contains('productsInBasket')) {
            String cachedProducts = (String) sessionPartition.get('productsInBasket');
            Map<String, Integer> mapCachedProducts = new Map<String, Integer>();
            List<String> cachedProductsList = cachedProducts.split(',');
            for (String s : cachedProductsList) {
                mapCachedProducts.put(s.split(':')[0], Integer.valueOf(s.split(':')[1]));
                listOfCachedProducts.add(s.split(':')[0]);
            }
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
                        WDLC_ProductWrapper wrap = new WDLC_ProductWrapper(String.valueOf(prod.Id), prod.Name, prod.Description,
                                prod.ProductCode, prod.photoUrl__c, String.valueOf(entry.UnitPrice));
                        wrappedProductsToOrder.add(new WDLC_ProductToOrderWrapper(wrap, mapCachedProducts.get(wrap.productId)));
                    }
                }
            }
            return wrappedProductsToOrder;
        } else {
            return wrappedProductsToOrder;
        }
    }
}