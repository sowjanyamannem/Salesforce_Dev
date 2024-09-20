public with sharing class event_class {
   @AuraEnabled(cacheable=true)
   public static List<details__c> eventrelateddetails(List<string> eventIds){
    try {

        List<details__c> eventsrelateddetails = [Select Id,Event__c,Name  From details__c Where Event__c IN: eventIds];
        return  eventsrelateddetails;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
   public static List<Event__c> getComdeyRecord(String eventId){
    System.debug('---in apex--'+eventId);
    try {
       // string comdeyId ='';
        List<Event__c> eventList = [Select Id,Name ,(select Id,Name FROM details__r)From Event__c Where Name LIKE : eventId];
        // if(eventList.size() > 0){
        //     comdeyId = eventList[0].Name;
        // }
        //System.debug('---logs=='+comdeyId);
        return eventList;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
    
}