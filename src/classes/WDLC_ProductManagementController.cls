/**
 * Created by Mateusz Wiorek on 31.03.2020.
 */

public with sharing class WDLC_ProductManagementController {
    @AuraEnabled
    public static List<String> getFamilyOptions() {
        List<String> options = new list < String > ();
        Schema.sObjectType objType = Product2.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
        list<Schema.PicklistEntry> values =
                fieldMap.get('Family').getDescribe().getPickListValues();
        for (Schema.PicklistEntry a : values) {
            options.add(a.getValue());
        }
        return options;
    }
    @AuraEnabled
    public static Id addProduct(String name, String description, String family, List<String> photosIds) {
        return WDLC_ProductHelper.addProduct(name, description, family, photosIds);
    }
    @AuraEnabled
    public static void setMainPhoto(String url, String productId) {
        List<Product2> products = [SELECT Id, photoUrl__c FROM Product2 WHERE Id = :productId];
        products[0].photoUrl__c = url;
        Database.SaveResult result = Database.update(products[0]);
    }
    @AuraEnabled
    public static String getMainPhoto(String productId) {
        List<Product2> products = [SELECT Id, photoUrl__c FROM Product2 WHERE Id = :productId];
        return products[0].photoUrl__c;
    }
    @AuraEnabled
    public static String getListViewId() {
        List<ListView> ids = [
                SELECT
                        DeveloperName,
                        Id
                FROM ListView
                WHERE DeveloperName = 'FurnitureProducts'
        ];
        return ids[0].Id;
    }
    @AuraEnabled
    public static List<String> getImages(String productId) {
        List<ContentDocumentLink> cdl = [
                SELECT ContentDocumentId, LinkedEntityId
                FROM ContentDocumentLink
                WHERE LinkedEntityId = :productId
        ];
        Set<String> ids = new Set<String>();
        for (ContentDocumentLink cd : cdl) {
            ids.add(cd.ContentDocumentId);
        }

        List<ContentDistribution> cddd = [
                SELECT ContentVersionId,
                        ContentDownloadUrl
                FROM ContentDistribution
                WHERE ContentVersionId IN (
                        SELECT Id
                        FROM ContentVersion
                        WHERE ContentDocumentId IN :ids
                )
        ];
        Set<String> idFromContentVersion = new Set<String>();
        Set<String> photos = new Set<String>();
        for (ContentDistribution c : cddd) {
            if (!idFromContentVersion.contains(c.ContentVersionId)) {
                photos.add(c.ContentDownloadUrl);
                idFromContentVersion.add(c.ContentVersionId);
            }
        }
        return new List<String>(photos);
    }
}