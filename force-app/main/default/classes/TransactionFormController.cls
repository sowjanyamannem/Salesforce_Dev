public with sharing class TransactionFormController {
    @AuraEnabled(cacheable=true)
    public static String getMessageForSuccessCode(String successCode){
        Bank_Info__mdt bankInfo = [Select Message__c From Bank_Info__mdt Where Success_Code__c =: successCode limit 1];
        return bankInfo != null ? bankInfo.Message__c : '';
    }
}