public class EventSeatsCalculator {

    // @AuraEnabled
    // public static String createRegistration(Id eventId, String Name) {
    //     try {
    //         // Check if maximum registrations (100) limit is reached
    //         Integer registrationsCount = [SELECT COUNT() FROM Registration__c WHERE associated_event__c = :eventId];
    //         System.debug('--=-=-=-=-=-'+registrationsCount);
    //         if (registrationsCount >= 100) {
    //             return 'Maximum registrations reached for this event.';
    //         }

    //         // Create Registration record
    //         Registration__c newRegistration = new Registration__c();
    //         newRegistration.associated_event__c = eventId;
    //         newRegistration.Name = Name; // Assuming Full Name field exists
    //         System.debug('--=-=-=-=-=-'+newRegistration);

    //         // Perform DML operation to insert record
    //         insert newRegistration;


    //         return 'Registration successful!';
    //     } catch (Exception e) {
    //         return 'Error creating registration: ' + e.getMessage();
    //     }
    // }
    
    
    public static void enforceMaxRegistrationsPerEvent(List<Registration__c> newRegistrations) {
        // Map to count registrations per Event
        Map<Id, Integer> eventRegistrationCounts = new Map<Id, Integer>();
        System.debug('here is the log :'+newRegistrations);
        // Collect counts of registrations for each Event from new records
        for (Registration__c reg : newRegistrations) {
            if (reg.associated_event__c != null) {
                if (!eventRegistrationCounts.containsKey(reg.associated_event__c)) {
                    eventRegistrationCounts.put(reg.associated_event__c, 0);
                }
                eventRegistrationCounts.put(reg.associated_event__c, eventRegistrationCounts.get(reg.associated_event__c) + 1);
            }
        }
        
        // Query existing registration counts for Events being inserted
        Map<Id, Integer> existingCounts = new Map<Id, Integer>();
        for (AggregateResult result : [
            SELECT associated_event__c, COUNT(Id) cnt
            FROM Registration__c
            WHERE associated_event__c IN :eventRegistrationCounts.keySet()
            GROUP BY associated_event__c
        ]) {
            existingCounts.put((Id)result.get('associated_event__c'), (Integer)result.get('cnt'));
        }
        
        // Check and prevent insertion of new registrations that exceed the limit
        for (Registration__c reg : newRegistrations) {
            Integer currentCount = existingCounts.get(reg.associated_event__c);
            Integer newCount = eventRegistrationCounts.get(reg.associated_event__c);
            if (currentCount != null && (currentCount + newCount) > 100) {
                reg.addError('Maximum registrations (100) reached for this event.');
            }
           
        }
        System.debug('error log is here'+eventRegistrationCounts);
    }    
    
    
    
    }
