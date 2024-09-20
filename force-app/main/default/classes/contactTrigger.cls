public with sharing class contactTrigger extends TriggerHandler {
    private override void BeforeInsert() {
        List<Contact> clist = trigger.new;
        TriggerHandler.bypass('');
        for(Contact c: clist){
            if(string.isblank(c.Email)){
                c.email = 'support@gmail.com';
                LOGGER.Info('Email Changed');
            }
        }

    }
}