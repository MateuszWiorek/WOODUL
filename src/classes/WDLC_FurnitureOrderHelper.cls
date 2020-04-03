/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrderHelper {
    public static Order addOrder(String addressOrder) {
        WDLC_OrderAddressWrapper address = (WDLC_OrderAddressWrapper) JSON.deserialize(addressOrder, WDLC_OrderAddressWrapper.class);
        if (!isAddressCorrect(address)) {
            throw new WDLC_CustomException(Label.WDLC_AddressOrderError);
        }
        List<WDLC_ProductToOrderWrapper> productsToOrder = WDLC_BasketController.getProductsInBasket();
        Order newOrder = new Order();
        Order__c orderCustomSetting = Order__c.getInstance('WDLCOrder');
        Pricebook2 pricebook = [SELECT Id FROM Pricebook2 WHERE IsActive = true LIMIT 1];
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

        try {
            Database.SaveResult saveResults = Database.insert(newOrder);
            if (saveResults.isSuccess()) {
                orderId = saveResults.Id;
            }
        } catch (DmlException e) {
            throw new WDLC_CustomException(Label.WDLC_OrderError);
        }
        List<OrderItem> itemsToOrder = new List<OrderItem>();
        for (WDLC_ProductToOrderWrapper wrappedProduct : productsToOrder) {
            OrderItem item = new OrderItem(OrderId = orderId);
            item.UnitPrice = Decimal.valueOf(wrappedProduct.product.productPrice);
            item.Quantity = wrappedProduct.quantity;
            item.PricebookEntryId = wrappedProduct.product.productPriceBookEntryId;
            item.UnitPrice = Decimal.valueOf(WDLC_ProductHelper.getLowestPriceForProduct(wrappedProduct.product.productId));
            item.Product2Id = wrappedProduct.product.productId;
            itemsToOrder.add(item);
        }
        try {
            insert itemsToOrder;
            WDLC_BasketHelper.removeBasket();
        } catch (DmlException e) {
            throw new WDLC_CustomException(Label.WDLC_OrderError + 'items' + e.getMessage());
        }
        return [
                SELECT BillingCountry, BillingState, BillingPostalCode, BillingCity, BillingStreet,
                        Status, TotalAmount, (
                        SELECT Id,
                                OrderId,
                                OrderItemNumber,
                                PricebookEntry.Product2.Name,
                                PricebookEntry.Product2.id,
                                Quantity,
                                UnitPrice
                        FROM OrderItems
                )
                FROM Order
                WHERE Id = :orderId
        ];
    }
    public static List<Order> getOrders() {
        return [
                SELECT
                        AccountId,
                        BillingAddress,
                        BillingCity,
                        BillingCountry,
                        BillingPostalCode,
                        BillingState,
                        CreatedById,
                        BillingStreet,
                        CreatedDate,
                        Id,
                        Name,
                        OrderNumber,
                        Status,
                        TotalAmount,
                        Type, (
                        SELECT Id,
                                OrderId,
                                OrderItemNumber,
                                PricebookEntry.Product2.Name,
                                PricebookEntry.Product2.id,
                                Quantity,
                                UnitPrice
                        FROM OrderItems
                )
                FROM Order
                WHERE CreatedById = :UserInfo.getUserId()
                ORDER BY CreatedDate DESC
        ];
    }
    private static Boolean isAddressCorrect(WDLC_OrderAddressWrapper address) {
        if (String.isNotEmpty(address.billingCountry)
                && String.isNotEmpty(address.billingPostalCode)
                && String.isNotEmpty(address.billingCity)
                && String.isNotEmpty(address.billingStreet)
                && String.isNotEmpty(address.billingState)) {
            return true;
        }
        return false;
    }
}