public with sharing class accountclass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String actName){
        String KeyString = '%' +  actName + '%';
        return [Select Id, Name From Account Where Name like:KeyString];
    }
}