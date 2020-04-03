/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */
@IsTest
public with sharing class WDLC_BasketTest {

    @IsTest
    public static void shouldAddProductToCache(){
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        System.assert(sessionPartition == null);
        Test.startTest();
        WDLC_BasketController.addProductToBasket('01t5J000000FuOoQAK');
        WDLC_BasketController.addProductToBasket('01t5J000000FuOoQAK');
        Test.stopTest();
        String cachedProducts = (String)sessionPartition.get('productsInBasket');
        System.assert(cachedProducts.length()==15);
    }
    @IsTest
    public static void shouldReturnCachedProducts(){
        String cachedProducts = '01t5J000000FuP3QAK,01t5J000000FuOtQAK,01t5J000000FuOoQAK';
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.TMDBUser');
        sessionPartition.put('productsInBasket', cachedProducts);
        Test.startTest();
        List<WDLC_ProductWrapper> productsInCache = WDLC_BasketController.getProductsInBasket();
        Test.stopTest();
        System.assertEquals(3, productsInCache.size());
    }
}