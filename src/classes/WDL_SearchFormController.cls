/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */

public with sharing class WDL_SearchFormController {

    @AuraEnabled
    public static List<Account> searchAccounts(String name, String division) {
        List<Account> accounts = new List<Account>();
        accounts = Database.query(WDL_Utils.createQuery(name, division, 'Account'));
        System.debug(accounts);
        return accounts;
    }

}