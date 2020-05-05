public class WDLC_ProductCompareController {

    @AuraEnabled
    public static List<Product2> getAllProducts(){
        return [SELECT Id, Name FROM Product2 WHERE RecordType.Name = 'Furniture'];
    }
    @AuraEnabled
    public static String getMainPhoto(String productId){
        return WDLC_ProductManagementController.getMainPhoto(productId);
    }
    @AuraEnabled
    public static String getCurrentPrice(String productId){
        return WDLC_ProductHelper.getLowestPriceForProduct(productId);
    }
}