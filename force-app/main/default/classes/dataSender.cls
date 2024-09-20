public with sharing class dataSender {

    static String clientId =  '3MVG95mg0lk4batjvKcsACeg18kraOsj8fSXpSykRKeh9vGzSM71tvzYmNAfTr.L8ULf1DQzwEt1jAfKZODEB';
    static String clientSecret ='DCD8079320EB795D5E487958A95526B22036C4BE3475F9ECA503264AD32ECE71';
    static String username = 'sowji119103@resourceful-fox-4ciw9o.com';
    static String password = 'Nanna@119103YjCMmxKeIo27NNeseVpRHqZFK';

    public class resWrapper{
        public String id;
        public String access_token;
    }

   
    public static String createCaseInExternalOrg() {

        string reqBody = 'grant_type=password&client_id=' + clientId + '&client_secret=' + clientSecret + '&username=' + username + '&password=' + password;
        // Construct the HTTP request
       


        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndPoint('https://resourceful-fox-4ciw9o-dev-ed.trailblaze.my.salesforce.com');//Set Endpoint URL Of the Source Org Webservice Class
        request.setMethod('POST');
        request.setBody(reqBody);
       // request.setHeader('Content-Type', 'application/json');
        // request.setBody('{"Origin":"'+Origin+'","Status":"'+Status+'","Subject":"'+Subject+'}');
       // Send the request and get the response
       
       // Set the request body (record data)
    //    Map<String, Object> requestBody = new Map<String, Object>{
    //      'Origin' => Origin,
    //      'Status' => Status,
    //      'Subject' => Subject
    //      // Add other fields as needed
    //  };
    // request.setBody(JSON.serialize(requestBody));
      request.setBody(reqBody);
     HttpResponse response = http.send(request);
        System.debug(response.getStatusCode());
    System.debug('the respoce-->'+response.getBody());
        resWrapper responses = (resWrapper)JSON.deserialize(response.getBody(),resWrapper.class);
        System.debug('response--->>>'+responses.access_token);
       
        if (response.getStatusCode() == 201){
            System.debug('case created successfully');
        }
        return responses.access_token;

    }
    
    @AuraEnabled
    public static void caseFieldsData(String Status,String Origin,String Subject){
       // List<Case>   caseList = new List<Case>();
          //  List<Case> listofcases = [Select Id, Origin,Status,Subject From Case];

                // for(Case cases:listofcases){
                //     Case c = new Case();
                //     c.Status=cases.Status;
                //     c.Origin = cases.Origin;
                //     // c.Priority=cases.Priority;
                //     c.Subject = cases.Subject;
                //     // c.Description = cases.Description;
                //     caseList.add(c);
                // }
                // if(caseList.size()>0){
                //     String str = JSON.serialize(caseList);
                //     System.debug('---=='+str);
                //     dataSender.caseToIntegrate(str);
                // }
                map<string,string> caseData = new map<string,string>();
                if(Status != null && Origin != null && Subject != null){
                    
                    caseData.put('Status',Status);
                    caseData.put('Origin',Origin);
                    caseData.put('Subject',Subject);
                }
                String str = JSON.serialize(caseData);
                System.debug('data of the str of serialize'+str);
                caseToIntegrate(str);
                System.debug(str);
                //return caseList;
    }




    // @future (callout=true)
    public static void caseToIntegrate(String inputJSONBody) {
        // System.debug('---in case'+caseIds);
        List<Case> caseNew = new List<Case>();
        String getData;
        String JSNBody;
       // String accessToken = createCaseInExternalOrg();
       // system.debug('accessToken --> '+accessToken);
       // if(accessToken != null) {
            system.debug('Response11');
                    //Set Endpoint URL Of the Target Org Webservice Class
                    //String endPoint = 'callout:My_named_credentials/services/apexrest/getDatas';
                    //system.debug('endPoint'+endPoint);
                        Http h2 = new Http();
                        HttpRequest req1 = new HttpRequest();
            system.debug('Response12');
            req1.setEndpoint('callout:My_named_credentials/services/apexrest/getDatas');
            req1.setMethod('POST');
                        req1.setHeader('Authorization','Bearer ' + UserInfo.getSessionId());
                        req1.setHeader('Content-Type','application/json');
                        //req1.setHeader('accept','application/json');
                       
                        req1.setBody(inputJSONBody);
                        
            system.debug('Response13');
                        HttpResponse res1 = h2.send(req1);
            system.debug('Response --> '+res1.getStatusCode());
        }
    
    }
    
