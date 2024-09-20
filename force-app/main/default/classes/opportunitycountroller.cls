public with sharing class opportunitycountroller {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity>  getopportunity(String accountId) {
       return [ SELECT Id, Name FROM Opportunity WHERE AccountId=:accountId ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getoppolist(Id accountIds){
        List<Opportunity>  oppolist= [ SELECT Id,Name FROM Opportunity Where AccountId =: accountIds];
        return oppolist;
    }
    @AuraEnabled
    public static List<Opportunity> recordidget(List<Opportunity> oppolist){

        List<Opportunity> newoppolist = oppolist;
        upsert newoppolist;
        return newoppolist;


    }
}