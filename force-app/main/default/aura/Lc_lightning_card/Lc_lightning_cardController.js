({
	callMe : function(component, event, helper) {
		//alert('This button was clicked and I was called');
		
        var nv1=component.get("v.some");
        alert('WELCOME'+nv1);
       
        component.set("v.age",30);
        component.set("v.sal",12,000);
        component.set("v.some","sam")
        
	}
})