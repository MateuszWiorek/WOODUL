/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */

public with sharing class WDL_SearchFormController {
    @AuraEnabled
    public static List<Account> accounts { get; set; }
    @AuraEnabled
    public static List<Account> searchAccounts(String name, String division) {
        if (String.isEmpty(name) && String.isEmpty(division)) {
            accounts = new List<Account>();
            return accounts;
        }
        accounts = new List<Account>();

        String query;
        if (String.isNotBlank(name) || String.isNotBlank(division)) {
            query = 'SELECT Name, Site, Type, Industry, Website, SLA__c, ShippingCity, ShippingStreet, Description From '+
                    'Account';
            query += ' WHERE ';
            if (String.isNotBlank(name) && String.isNotBlank(division)) {
                query += 'Name LIKE \'%' + name + '%\' ';
                query += 'AND ';
                query += 'ShippingCity LIKE \'%' + division + '%\' ';
            } else {
                if (String.isNotBlank(name)) {
                    query += 'Name LIKE \'%' + name + '%\'';
                }
                if (String.isNotBlank(division)) {
                    query += 'ShippingCity LIKE \'%' + division + '%\'';
                }
            }
            query+= ' AND RecordType.Name = \'Division\'';
        }

        try {
            accounts = Database.query(query);
        }catch (Exception e ){
            throw new AuraHandledException(e.getMessage().substring(0,80));
        }
        return accounts;
    }

}