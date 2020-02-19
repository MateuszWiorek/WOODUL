/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */

public with sharing class WDL_Utils {
    public static String createQuery(String name, String shippingAddress, String type) {
        String query = 'SELECT Name, ShippingAddress, Description From '+ type;
        if (String.isNotBlank(name) || String.isNotBlank(shippingAddress)) {
            query += ' WHERE ';
            if (String.isNotBlank(name) && String.isNotBlank(shippingAddress)) {
                query += 'Name LIKE \'%' + name + '%\' ';
                query += 'AND ';
                query += 'ShippingAddress LIKE \'%' + shippingAddress + '%';
            } else {
                if (String.isNotBlank(name)) {
                    query += 'Name LIKE \'%' + name + '%\'';
                }
                if (String.isNotBlank(shippingAddress)) {
                    query += 'ShippingAddress LIKE \'%' + shippingAddress + '%\'';
                }
            }
        }
        return query;
    }
}