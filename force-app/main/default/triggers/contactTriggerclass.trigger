trigger contactTriggerclass on Contact (before insert,before update, after insert, after update, ) {

    new contactTrigger.run();
}