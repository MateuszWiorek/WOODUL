/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */

public with sharing class WDLC_ProductWrapper {
    @AuraEnabled
    public String productId{get; set;}
    @AuraEnabled
    public String productName{get; set;}
    @AuraEnabled
    public String productDescription{get; set;}
    @AuraEnabled
    public String productCode{get; set;}
    @AuraEnabled
    public String productPhotoUrl{get; set;}
    @AuraEnabled
    public String secondPhotoUrl{get;set;}
    @AuraEnabled
    public String productPrice{get; set;}
    @AuraEnabled
    public String productFamily{get; set;}
    @AuraEnabled
    public String productPriceBookEntryId{get;set;}
    @AuraEnabled
    public Boolean isWishlisted{get;set;}
    @AuraEnabled
    public String productPriceAfterDiscount{get; set;}
    @AuraEnabled
    public String discountAmount{get; set;}
    public WDLC_ProductWrapper(String productId, String name, String description, String code,
            String photoURL, String productPrice){
        this.productId = productId;
        this.productName = name;
        this.productDescription = description;
        this.productCode = code;
        this.productPhotoUrl = photoURL;
        this.productPrice = productPrice;
    }
}