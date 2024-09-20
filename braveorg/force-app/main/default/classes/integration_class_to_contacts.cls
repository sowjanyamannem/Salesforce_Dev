public class integration_class_to_contacts {
      //Future annotation to mark the method as async.
  		@Future(callout=true)
    public static void updateContact(){
         Http http = new Http();
         HttpRequest request = new HttpRequest();    
        request.setEndpoint('callout:google_contacts/services/apexrest/SampleRestAPI/');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody('{"name":"mighty moose"}');
        HttpResponse response = http.send(request);
        // Parse the JSON response
        if (response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }
    	
    //check the response
    if (response.getStatusCode() == 200) {

      //update account
    
    } else {
      System.debug('Callout failed: ' );
    } 
        
    }

}