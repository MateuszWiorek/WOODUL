/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */

public with sharing class WDLC_ProductWrapper {
    @AuraEnabled
    public String productName{get; set;}
    @AuraEnabled
    public String productDescription{get; set;}
    @AuraEnabled
    public String productCode{get; set;}
    @AuraEnabled
    public String productPhotoUrl{get; set;}

    public WDLC_ProductWrapper(String name, String description, String code, String photoURL){
        this.productName = name;
        this.productDescription = description;
        this.productCode = code;
        this.productPhotoUrl = photoURL;
    }
}