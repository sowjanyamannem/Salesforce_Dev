public with sharing class new_map {
    @AuraEnabled(cacheable=true)
    public static wrapperclassofallobjects new_class_method(id accId) {
        Map<Id, List<Contact>> accountContactsMap = new Map<Id, List<Contact>>();
        List<Contact> contactids = new List<Contact>();
 
       for (Contact c : [SELECT AccountId,Id,FirstName,LastName,Email,Phone FROM Contact]) {
        system.debug('the accounts and contacts data is here :'+c);
        if (!accountContactsMap.containsKey(c.AccountId)) {
            accountContactsMap.put(c.AccountId, new List<Contact>{c});
        } 
        else {
            accountContactsMap.get(c.AccountId).add(c);
        }
        contactids.add(c);
        }
        List<opportunity__c> listofopp = new List<opportunity__c>();
        Map<Id, List<opportunity__c>> contactstoopportunitys = new Map<Id, List<opportunity__c>>();

        for(opportunity__c opp : [SELECT Contact__c,Id,Name From opportunity__c  where Contact__c IN: contactids ]){
           
            if(!contactstoopportunitys.containsKey(opp.Contact__c)){
                system.debug('the data is here'+contactstoopportunitys);
                contactstoopportunitys.put(opp.Contact__c, new List<opportunity__c>{opp});
            } 
            else {
                contactstoopportunitys.get(opp.Contact__c).add(opp);
            }
            listofopp.add(opp);
        }
        
        List<product__c> listofpro = new List<product__c>();
        Map<Id, List<product__c>> opportunitystoproducts = new Map<Id, List<product__c>>();
        for(product__c pro : [SELECT opportunity__c,Id,Name FROM product__c WHERE opportunity__c IN: listofopp])
        {
            if(!opportunitystoproducts.containsKey(pro.opportunity__c)){
                opportunitystoproducts.put(pro.opportunity__c, new List<product__c>{pro});
            }
            else {
                opportunitystoproducts.get(pro.opportunity__c).add(pro);
            }
            listofpro.add(pro);
        }
  
        Map<Id, List<order__c>> productstoorders = new Map<Id, List<order__c>>();
        for(order__c ord : [SELECT product__c,Id,Name FROM order__c WHERE product__c IN: listofpro])
        {
            if(!productstoorders.containsKey(ord.product__c)){
                productstoorders.put(ord.product__c, new List<order__c>{ord});
            }
            else {
                productstoorders.get(ord.product__c).add(ord);
            }
        }
            
        
        system.debug(accountContactsMap);
        system.debug(contactstoopportunitys);
        system.debug(opportunitystoproducts);
        system.debug(productstoorders);

        wrapperclassofallobjects accwrapper = new wrapperclassofallobjects();
       // List<wrapperclassofallobjects> wrapperclassofobjects = new List<wrapperclassofallobjects>();
        List<Account> accList = [SELECT Id, Name, Phone, Fax ,(SELECT Id,LastName, Email,phone From Contacts)FROM Account];
        if(!accList.isEmpty()){
           // for(Account acc : accList){
                //  wrapperclassofallobjects accwrapper = new wrapperclassofallobjects();
                accwrapper.accRecord = accList;
               
            //}
        }
        accwrapper.contRecord = accountContactsMap;
        accwrapper.oppRecords = contactstoopportunitys;
        accwrapper.proRecord = opportunitystoproducts;
        accwrapper.ordRecord = productstoorders;
        //wrapperclassofobjects.add(accwrapper);
        system.debug(accwrapper);
        return accwrapper;
        
    }
    // @AuraEnabled(cacheable=true)
    //     public static List<wrapperclassofallobjects> getallaccountrelatedobjects(){
    //         List<wrapperclassofallobjects> wrapperclassofobjects = new List<wrapperclassofallobjects>();
    //         Account accList = [SELECT Id, Name, Industry,(SELECT Id,Name, Email,phone From Contacts) FROM Account];
    //         if(!accList.isEmpty()){
    //             for(Account acc : accList){
    //                 wrapperclassofallobjects accwrapper = new wrapperclassofallobjects();
    //                 accwrapper.accRecord = acc;
    //                 accwrapper.contRecord = accountContactsMap;
    //                 accwrapper.oppRecords = contactstoopportunitys;
    //                 accwrapper.proRecord = opportunitystoproducts;
    //                 accwrapper.ordRecord = productstoorders;
    //                 wrapperclassofobjects.add(accwrapper);
    //             }
    //         }
    //         return wrapperclassofobjects;
        
    //     }


        public class wrapperclassofallobjects{
            @AuraEnabled
            public   List<Account> accRecord{get;set;}
        
            @AuraEnabled
            public map<Id, List<Contact>> contRecord{get;set;}
        
            @AuraEnabled
            public map<Id, List<opportunity__c>> oppRecords{get;set;}
        
            @AuraEnabled
            public map<Id, List<product__c>> proRecord{get;set;}
        
            @AuraEnabled
            public 	map<Id, List<order__c>> ordRecord{get;set;}
           }
}