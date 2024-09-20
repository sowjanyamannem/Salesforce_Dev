public with sharing class Accounts_Class {
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getAccounts() {
        return [SELECT Id, Name  from Event__c];
    }
}