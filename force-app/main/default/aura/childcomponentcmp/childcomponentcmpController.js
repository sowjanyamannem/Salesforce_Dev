({
    handleClick : function(component, event, helper) {
        var compEvent = component.getEvent("sampleComponentEvent");
        compEvent.setParams({
            "message" : component.get("v.enteredText") 
        });
        compEvent.fire();
    }
})