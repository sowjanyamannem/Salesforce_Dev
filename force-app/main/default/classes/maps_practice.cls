public with sharing class maps_practice {
  
    public  void methodNameqw(){
     // List<Account> acc =[select Id From Account];
     map<Id,account> myacc = new map<Id,account>([select id,name,(select id,name,phone from contacts) from account ]);
     map<Id, List<Contact>> myconts = new  map<Id, List<Contact>>();
     Set<Id> conIds = new Set<Id>();
    //  map<Id, List<opportunity__c>> oppo = new map<Id, List<opportunity__c>>();
     for(Id indvals :myacc.keyset())
     {
         myconts.put(indvals,myacc.get(indvals).contacts);
         //system.debug(indvals +"-----"+get(indvals).contacts);
     }
     
     system.debug(myconts);
     for(Contact conObj:conList){
        if(conObj.Id != null){
            conIds.add(conObj.Id);
        }
     }
     system.debug('conids'+conIds);
    List<opportunity__c> oppList = new List<opportunity__c>();
    oppList = [Select Id,Name,Contact__r.Id From opportunity__c where Contact__r.Id IN: conIds];
    map<Id, List<opportunity__c>> oppo = new map<Id, List<opportunity__c>>();
    system.debug('here the oppolist '+oppList);
     for(opportunity__c oppObj:oppList){
    
        if(oppObj.Id != null){
           oppo.put(oppObj.Id,oppList);
        }
     }
     system.debug('here the opp'+oppo);
    //  for(Id indvals1 :myconts.keyset()){
    //     oppo.put(indvals1,myconts.get(indvals1).opportunity__c);
    //  }
    
     //  map<Id,List<Contact>> accToConMap = new map<Id,List<Contact>>();
 
     //  for(contact con : [select Id, AccountId from contact]){
 
     //     if(accToConMap.contains(con.AccountId)){
     //         accToConMap.put(accToConMap.get(on.AccountId));
     //     }
     //  }
 
     
    //  String mapString = String.valueOf(myconts);
 
 
         // map<Id,List<opportunity__c> conToopp =new map<Id,List<opportunity__c>();
 
         // for(opportunity__c opp : [select Id, Contact__c from opportunity__c]){
 
         //     if(conToopp.contains(opp.))
         // }
        //  return myconts;
    }
   
 }