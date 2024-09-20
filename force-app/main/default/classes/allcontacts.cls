public with sharing class allcontacts {
    @AuraEnabled(cacheable=true)
    public static List<contact> getcontacts(String searchtext){
        String key = '%'+ searchtext+'%';
        List<contact> connt= [Select Id,FirstName From contact Where FirstName like :key];
        system.debug(connt);
       Return connt;
        
    }
}