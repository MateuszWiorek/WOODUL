/**
 * Created by Mateusz Wiorek on 24.03.2020.
 */

public with sharing class WDLC_FurnitureOrdersHistoryHelper {
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
        ];
    }
}