/**
 * Created by Mateusz Wiorek on 19.02.2020.
 */

public with sharing class WDL_Utils {
    public static User getCurrentUserInfo() {
        User u = [
                SELECT FirstName, LastName, City, Street, State, Country, PostalCode
                FROM User
                WHERE Id = :UserInfo.getUserId()
        ];
        return u;
    }
}