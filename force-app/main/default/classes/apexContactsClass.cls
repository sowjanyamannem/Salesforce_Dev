public with sharing class apexContactsClass {
    @AuraEnabled(cacheable=true)
    public static List<contact> allContacts(String serachtext){
        String key = '%' + serachtext + '%';
        
       List<contact> contacts= [Select Id,FirstName,LastName, Phone From contact Where  FirstName like :key ];
       
       Return contacts;
       
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> allAccounts(String searchtext){
        List<Account> accounts = new List<Account>();
           
            if(String.isBlank(searchtext)){
                return accounts;
            }else{
                String Key = '%'+ searchtext+ '%';
            // create contact list to store search result 
        // list<Account> accountsListRecord = new list<Account>();
          accounts = [Select Id,Name From Account Where Name like: Key];
        //      // query contact records
        // for(Account accounts : [Select Id,Name From Account Where Name like: Key]){
        //     accountsListRecord.add(accounts);
        // }


        // if(accountsListRecord.size() == 0){
        //     throw new AuraHandledException('No Record Found..'); 
        //  }
        Return  accounts;
            }
    }

    @AuraEnabled
    public static List<Contact> accountrelatedcontacts(List<Id> accId){
        
        System.debug('----accid--->'+accId);
        List<Contact> contacts = [Select Id,AccountId, Account.Name,LastName,Email From Contact Where AccountId IN: accId];
        System.debug(contacts);
        return  contacts;
    }
  
    @AuraEnabled
    public static List<Opportunity> accountrelatedcase(List<Id> conId){
        System.debug('---fdsf'+conId);
        List<Opportunity> oppor= [Select Id,ContactId,Name,Amount From Opportunity Where ContactId IN: conId];
        System.debug(oppor);
        return oppor;

    }

    @AuraEnabled
    public static List<Product2>  opporelatedproducts(List<Id> oppoId){
        List<Product2> products1 = [Select OpportunityId,Id,Name From Product2 Where OpportunityId IN: oppoId];
        System.debug(products1);
        return products1;
    }
}