({
	onLogin : function(component, event, helper) {
		var usrname = component.find('username').get('v.value');
        var pwd = component.find('password').get('v.value');
        if(usrname != '' && pwd != ''){
            helper.loginHelper(component, event, helper,usrname,pwd)
        }else{
           console.log("Debugging message");

        }
	}
})