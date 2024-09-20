trigger updatetrigger on Contact (after update) {
    updatehandler updatehandler1 = new updatehandler();
    updatehandler1.updatedata(Trigger.New);
}