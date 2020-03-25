/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_ProductToOrderWrapper {
    @AuraEnabled
    public WDLC_ProductWrapper product { get; set; }
    @AuraEnabled
    public Integer quantity { get; set; }
    @AuraEnabled
    public Decimal totalCost {get;set;}
    public WDLC_ProductToOrderWrapper(WDLC_ProductWrapper product, Integer quantity){
        this.product = product;
        this.quantity = quantity;
        totalCost = quantity * Decimal.valueOf(product.productPrice);
    }
}