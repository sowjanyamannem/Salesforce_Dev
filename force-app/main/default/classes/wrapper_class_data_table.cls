public with sharing class wrapper_class_data_table {
    public static List<wrapperclassofallobjects> getallaccountrelatedobjects(){
        List<wrapperclassofallobjects> wrapperclassofobjects = new List<wrapperclassofallobjects>();
        List<Account> accList = [SELECT Id, Name, Industry,(SELECT Id,Name, Email,phone From Contacts) FROM Account];
        if(!accList.isEmpty()){
            for(Account acc : accList){
                wrapperclassofallobjects accwrapper = new wrapperclassofallobjects();
                accwrapper.accRecord = acc;
                accwrapper.contRecord = acc.Contacts;
                
            }
        }

    }



   public class wrapperclassofallobjects{
    @AuraEnabled
    public Account accRecord{get;set;}

    @AuraEnabled
    public Contact contRecord{get;set;}

    @AuraEnabled
    public opportunity__c oppRecords{get;set;}

    @AuraEnabled
    public product__c proRecord{get;set;}

    @AuraEnabled
    public 	order__c ordRecord{get;set;}
   }
}