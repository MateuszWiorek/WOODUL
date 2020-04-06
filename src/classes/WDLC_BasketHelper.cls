/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_BasketHelper {

    public static void addProductToBasket(String id) {
        Map<String, Integer> cachedProducts = getBasketMapFromCache(Label.WDLC_BasketCachePartition);
        cachedProducts.put(id, (cachedProducts.containsKey(id)) ? cachedProducts.get(id) + 1 : 1);
        Cache.Session.put(Label.WDLC_BasketCachePartition, cachedProducts);
    }
    public static WDLC_ProductToOrderWrapper increaseProductCounter(String id) {
        Map<String, Integer> cachedProducts = getBasketMapFromCache(Label.WDLC_BasketCachePartition);
        cachedProducts.put(id, (cachedProducts.containsKey(id)) ? cachedProducts.get(id) + 1 : 1);
        Cache.Session.put(Label.WDLC_BasketCachePartition, cachedProducts);
        return getProduct(id);
    }
    public static WDLC_ProductToOrderWrapper decreaseProductCounter(String id) {
        Map<String, Integer> cachedProducts = getBasketMapFromCache(Label.WDLC_BasketCachePartition);
        if (cachedProducts.containsKey(id)) {
            if (cachedProducts.get(id) > 1) {
                cachedProducts.put(id, cachedProducts.get(id) - 1);
            }
        }
        Cache.Session.put(Label.WDLC_BasketCachePartition, cachedProducts);
        return getProduct(id);
    }
    public static WDLC_ProductToOrderWrapper changeProductCounter(String id, Integer newValue) {
        Map<String, Integer> cachedProducts = getBasketMapFromCache(Label.WDLC_BasketCachePartition);
        cachedProducts.put(id, newValue);
        Cache.Session.put(Label.WDLC_BasketCachePartition, cachedProducts);
        return getProduct(id);
    }
    public static void removeProduct(String productId) {
        Map<String, Integer> cachedProducts = getBasketMapFromCache(Label.WDLC_BasketCachePartition);
        if (cachedProducts.containsKey(productId)) {
            cachedProducts.remove(productId);
        }
        Cache.Session.put(Label.WDLC_BasketCachePartition, cachedProducts);
    }
    public static List<WDLC_ProductToOrderWrapper> getProductsInBasket() {
        return getWrappedProducts(getBasketMapFromCache(Label.WDLC_BasketCachePartition));
    }
    public static WDLC_ProductToOrderWrapper getProduct(String productId) {
        Map<String, Integer> cachedProducts = getBasketMapFromCache(Label.WDLC_BasketCachePartition);
        if (cachedProducts.containsKey(productId)) {
            return getWrappedProducts(new Map<String, Integer>{
                    productId => cachedProducts.get(productId)
            }).get(0);
        } else {
            throw new WDLC_CustomException(Label.WDLC_NotExistingProduct);
        }
    }
    public static void removeBasket() {
        if (Cache.Session.contains(Label.WDLC_BasketCachePartition)) {
            Cache.Session.remove(Label.WDLC_BasketCachePartition);
        }
    }
    private static Map<String, Integer> getBasketMapFromCache(String namespaceCache) {
        Map<String, Integer> cachedProducts = new Map<String, Integer>();
        if (Cache.Session.contains(namespaceCache)) {
            return (Map<String, Integer>) Cache.Session.get(namespaceCache);
        } else {
            return new Map<String, Integer>();
        }
    }
    private static List<WDLC_ProductToOrderWrapper> getWrappedProducts(Map<String, Integer> cachedProducts) {
        if (cachedProducts.size() == 0) {
            return new List<WDLC_ProductToOrderWrapper>();
        }
        List<WDLC_ProductToOrderWrapper> wrappedProductsToOrder = new List<WDLC_ProductToOrderWrapper>();
        List<Product2> products = [
                SELECT
                        Name,
                        Description,
                        DisplayUrl,
                        Id,
                        photoUrl__c,
                        ProductCode
                FROM Product2
                WHERE Id IN :cachedProducts.keySet()
        ];
        for (Product2 prod : products) {
                    WDLC_ProductWrapper wrap = new WDLC_ProductWrapper(String.valueOf(prod.Id), prod.Name, prod.Description,
                            prod.ProductCode, prod.photoUrl__c, (String)WDLC_ProductHelper.getLowestPriceForProduct(prod.Id));
                    wrappedProductsToOrder.add(new WDLC_ProductToOrderWrapper(wrap, cachedProducts.get(wrap.productId)));
        }
        if (wrappedProductsToOrder.size() == 0) {
            throw new WDLC_CustomException(Label.WDLC_NotExistingProduct);
        }
        return wrappedProductsToOrder;
    }
}