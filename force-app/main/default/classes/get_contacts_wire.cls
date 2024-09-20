public with sharing class get_contacts_wire {
    @AuraEnabled(cacheable  = true)
    public static List<Contact> get_contacts_wire1() {
            return [Select Id,FirstName,LastName,Phone,Email From Contact];
    }
}