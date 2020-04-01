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

    public List<WDLC_Photo__c> getPhotos(List<String> files, String productId) {
        String startURL = Label.WDLC_StartUrl;
        List<WDLC_Photo__c> photos = new List<WDLC_Photo__c>();
        for (String file : files) {
            WDLC_Photo__c photo = new WDLC_Photo__c();
            photo.FileId__c = startURL + file;
            photo.Product__c = productId;
            photos.add(photo);
        }
        Database.upsert(photos);
        return photos;
    }
    @AuraEnabled
    public static Id addProduct(String name, String description, String family, List<String> photosIds) {
        String startURL = Label.WDLC_StartUrl;
        Id recordTypeId = Schema.SObjectType.Product2.getRecordTypeInfosByName().get('Furniture').getRecordTypeId();
        Product2 prod = new Product2();
        prod.Name = name;
        prod.Description = description;
        prod.Family = family;
        prod.IsActive = true;
        prod.RecordTypeId = recordTypeId;

        Database.SaveResult sr = Database.insert(prod);
        String productId = sr.getId();

        List<ContentDocumentLink> cdl = new List<ContentDocumentLink>();
        for (String pI : photosIds) {
            cdl.add(new ContentDocumentLink(LinkedEntityId = productId, ContentDocumentId = pI,
                    ShareType = 'I', Visibility = 'AllUsers'));
        }
        Set<String> ids = new Set<String>();
        for (ContentDocumentLink cd : cdl) {
            ids.add(cd.ContentDocumentId);
        }
        insert cdl;
        List<ContentVersion> cvs = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :ids];
        List<ContentDistribution> cds = new List<ContentDistribution>();
        for (ContentVersion cv : cvs) {
            ContentDistribution cd = new ContentDistribution();

            cd.Name = 'Test';
            cd.ContentVersionId = cv.id;
            cd.PreferencesAllowViewInBrowser = true;
            cd.PreferencesLinkLatestVersion = true;
            cd.PreferencesNotifyOnVisit = false;
            cd.PreferencesPasswordRequired = false;
            cd.PreferencesAllowOriginalDownload = true;
            cds.add(cd);
        }
        insert cds;
        ContentDistribution contentDistributionRetrieved = [
                SELECT
                        ContentDownloadUrl, ContentVersionId
                FROM ContentDistribution
                WHERE ContentVersionId = :cvs.get(0).Id
                LIMIT 1
        ];
        prod.photoUrl__c = contentDistributionRetrieved.ContentDownloadUrl;

        upsert prod;
        List<WDLC_Photo__c> photos = new List<WDLC_Photo__c>();
        for (String ph : photosIds) {
            WDLC_Photo__c photo = new WDLC_Photo__c();
            photo.Product__c = productId;
            photo.FileId__c = ph;
            photos.add(photo);
        }
        Database.insert(photos);
        return productId;
    }
    @AuraEnabled
    public static List<WDLC_Photo__c> loadPhotos(String id) {
        List<WDLC_Photo__c> photos = [SELECT Id, Product__c, FileId__c FROM WDLC_Photo__c WHERE Product__c = :id];
        return photos;
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
        System.debug(cdl);
        Set<String> ids = new Set<String>();
        for (ContentDocumentLink cd : cdl) {
            ids.add(cd.ContentDocumentId);
        }
        System.debug(ids);
        List<ContentVersion> cvs = [
                SELECT Id
                FROM ContentVersion
                WHERE ContentDocumentId IN :ids
        ];
        System.debug(cvs);
        Set<String> cvIds = new Set<String>();
        for (ContentVersion cv : cvs) {
            cvIds.add(cv.Id);
        }
        System.debug(cvIds);
        List<ContentDistribution> cddd = [
                SELECT ContentVersionId,
                        ContentDownloadUrl
                FROM ContentDistribution
                WHERE ContentVersionId IN :cvIds
        ];
        System.debug(cddd);
        List<String> photos = new List<String>();
        for (ContentDistribution c : cddd) {
            photos.add(c.ContentDownloadUrl);
        }
        System.debug(photos);
    return photos;
    }
}