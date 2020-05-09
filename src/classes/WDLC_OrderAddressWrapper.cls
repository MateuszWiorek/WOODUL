/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_OrderAddressWrapper {
    @AuraEnabled
    public String billingStreet { get; set; }

    @AuraEnabled
    public String billingPostalCode { get; set; }

    @AuraEnabled
    public String billingState { get; set; }

    @AuraEnabled
    public String billingCountry { get; set; }

    @AuraEnabled
    public String billingCity { get; set; }

    public WDLC_OrderAddressWrapper(String street, String postalCode, String state, String country, String city){
        this.billingStreet = street;
        this.billingPostalCode = postalCode;
        this.billingState = state;
        this.billingCountry = country;
        this.billingCity = city;
    }
}