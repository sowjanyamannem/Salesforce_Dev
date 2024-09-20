({
    dosave: function(component, event, helper) {
        var action=component.get("c.Createcontact");
        action.setParams({'conobj':component.get('v.contactobj')});
        action.setCallback(this,function(data){
            component.set('v.contactId',data.getReturnValue())
        });
         $A.enqueueAction(action);
        // $A.get('e.force:refreshView').fire();
    }
})