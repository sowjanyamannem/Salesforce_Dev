({
	featchconhelper: function(component,event,helper) {
        component.set('v.mycolumn',[
            
            {label:'Contact Name', fieldName:'LastName',type:'text' },
            {label:'Phone',fieldName:'Phone',type:'Phone'}
        ]);
        var action=component.get("c.fectchconvalue");
        action.setParams({
            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.Contactobj",response.getReturnValue());
        }
        });
		$A.enqueueAction(action);
	}
})