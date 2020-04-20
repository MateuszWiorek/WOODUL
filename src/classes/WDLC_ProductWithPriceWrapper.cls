/**
 * Created by Mateusz Wiorek on 02.04.2020.
 */

public with sharing class WDLC_ProductWithPriceWrapper {
    @AuraEnabled
    public String productId { get; set; }
    @AuraEnabled
    public Decimal price { get; set; }
    @AuraEnabled
    public String errorMessage { get; set; }
    public WDLC_ProductWithPriceWrapper(String productId, Decimal price, String errorMessage){
        this.productId = productId;
        this.price = price;
        this.errorMessage = errorMessage;
    }
}