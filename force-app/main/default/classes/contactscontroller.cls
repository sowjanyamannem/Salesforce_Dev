public with sharing class contactscontroller {
    @AuraEnabled(cacheable=true)
    public static List<Contact> findbycontact(String accountId) {
       return [ SELECT Id, FirstName, LastName FROM Contact  WHERE AccountId=:accountId 

       LIMIT 10];
    }
}