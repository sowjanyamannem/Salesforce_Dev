public with sharing class registration_form_class {
    @AuraEnabled
    public static List<Event__c> getregistrationrecords(String searchTerm) {
        System.debug('---in apec'+searchTerm);
         return [SELECT Id, Name FROM Event__c WHERE Name LIKE :('%' + searchTerm + '%') LIMIT 10];

    }

    
    
}