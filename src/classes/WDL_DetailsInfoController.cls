/**
 * Created by Mateusz Wiorek on 21.02.2020.
 */

public with sharing class WDL_DetailsInfoController {
    @AuraEnabled
    public static Boolean deleteAccount(String Id) {
        Account acc = [
                SELECT Id
                FROM Account
                WHERE Id = :Id
        ];
        Database.DeleteResult result = Database.delete(acc);
        if(result.isSuccess()){
            return true;
        }else{
            return false;
        }
    }
}