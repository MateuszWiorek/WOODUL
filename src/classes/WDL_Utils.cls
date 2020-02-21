/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */

public with sharing class WDL_Utils {
    public static String createQuery(String name, String shippingAddress, String type) {
        System.debug(shippingAddress);
        System.debug(name);
        String query;
        if (String.isNotBlank(name) || String.isNotBlank(shippingAddress)) {
            query = 'SELECT Name, Site, Type, Industry, Website, SLA__c, ShippingCity, ShippingStreet, Description From '+ type;
            query += ' WHERE ';
            if (String.isNotBlank(name) && String.isNotBlank(shippingAddress)) {
                query += 'Name LIKE \'%' + name + '%\' ';
                query += 'AND ';
                query += 'ShippingCity LIKE \'%' + shippingAddress + '%\' ';
            } else {
                if (String.isNotBlank(name)) {
                    query += 'Name LIKE \'%' + name + '%\'';
                }
                if (String.isNotBlank(shippingAddress)) {
                    query += 'ShippingCity LIKE \'%' + shippingAddress + '%\'';
                }
            }
        }
        return query;
    }
}