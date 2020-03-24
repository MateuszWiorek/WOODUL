/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrderHelper {
    public static List<WDLC_ProductToOrderWrapper> getProductToOrder(){
        List<WDLC_ProductToOrderWrapper> wrappedProductsToOrder = new List<WDLC_ProductToOrderWrapper>();
        List<WDLC_ProductWrapper> wrappedProducts = WDLC_BasketController.getProductsInBasket();
        for(WDLC_ProductWrapper prod : wrappedProducts){
            wrappedProductsToOrder.add(new WDLC_ProductToOrderWrapper(prod, 1));
        }
        return wrappedProductsToOrder;
    }
    public static Order addOrder(String addressOrder){
        WDLC_OrderAddressWrapper address = (WDLC_OrderAddressWrapper) JSON.deserialize(addressOrder, WDLC_OrderAddressWrapper.class);
        List<WDLC_ProductToOrderWrapper> productsToOrder = getProductToOrder();
        Order newOrder = new Order();
        Order__c orderCustomSetting = Order__c.getInstance('WDLCOrder');
        Pricebook2 pricebook = [SELECT Id FROM Pricebook2 WHERE Name = 'Standard Price Book'];
        String orderId;

        newOrder.AccountId = orderCustomSetting.AccountId__c;
        newOrder.ContractId = orderCustomSetting.ContractId__c;
        newOrder.BillingStreet = address.billingStreet;
        newOrder.BillingCity = address.billingCity;
        newOrder.BillingPostalCode = address.billingPostalCode;
        newOrder.BillingState = address.billingState;
        newOrder.BillingCountry = address.billingCountry;
        newOrder.Status = 'Draft';
        newOrder.EndDate = Date.today().addDays(14);
        newOrder.EffectiveDate = Date.today();
        newOrder.Pricebook2Id = pricebook.Id;

        try{
            Database.SaveResult saveResults = Database.insert(newOrder);
            if(saveResults.isSuccess()){
                orderId = saveResults.Id;
            }
        }catch (DmlException e){
            throw new WDLC_CustomException('We cannot process Your order. Sorry');
        }
        List<OrderItem> itemsToOrder = new List<OrderItem>();
            for(WDLC_ProductToOrderWrapper wrappedProduct : productsToOrder){
                OrderItem item = new OrderItem(OrderId = orderId);
                item.UnitPrice = Decimal.valueOf(wrappedProduct.product.productPrice);
                item.Quantity = wrappedProduct.quantity;
                item.PricebookEntryId = wrappedProduct.product.productPriceBookEntryId;
                item.Product2Id = wrappedProduct.product.productId;
                itemsToOrder.add(item);
            }
        try{
            insert itemsToOrder;
        }catch (DmlException e){
            throw new WDLC_CustomException('We cannot process Your order. Sorry');
        }
        return newOrder;
    }
}