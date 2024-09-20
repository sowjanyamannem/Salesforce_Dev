public with sharing class contactswithaccounts {
    @AuraEnabled(Cacheable = false)
    public  static List<Contact>  getcontacts(){
        List<Contact>   contlist =   [Select Id, Account.Name,LastName,FirstName,Phone,Email From Contact Where AccountId  =: '0015i00000kSkFLAA0'];
        return contlist;
    }


  

}