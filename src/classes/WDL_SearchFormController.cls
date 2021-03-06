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
        try {
            accounts = Database.query(WDL_Utils.createQuery(name, division, 'Account'));
        }catch (Exception e ){
            throw new AuraHandledException(e.getMessage().substring(0,80));
        }
        return accounts;
    }

}