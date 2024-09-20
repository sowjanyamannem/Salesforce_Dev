@RestResource(urlMapping= '/getData/*')
global class integrationorg_ts {  
 @HttpPost
    global static String fetchAccount(){
        system.debug('Calling fetchAccount');
        RestRequest req = RestContext.request;
        RestResponse res = Restcontext.response;
        string jsonString= req.requestBody.tostring();
        
       	List<responseWrapper> wRes = (List<responseWrapper>)JSON.deserialize(jsonString,List<responseWrapper>.class);
        system.debug('Calling fetchAccount1122 --> '+wRes);
        List<Case> caseList = new List<Case>();
        for(responseWrapper mapKey :wRes){
            Case caseObj = new Case();
            caseObj.Status = mapKey.Status;
            caseObj.Priority = mapKey.Priority;
            caseObj.Origin = mapKey.Origin;
            caseObj.Subject = mapKey.Subject;
            caseList.add(caseObj);
        }
         system.debug('caseList -> '+caseList);
          	insert caseList;
        	return 'Sucess';
    }
    public class responseWrapper{
        @AuraEnabled
        public String caseId;
        @AuraEnabled
        public String Status;
        @AuraEnabled
        public String Priority;
        @AuraEnabled
        public String Origin;
        @AuraEnabled
        public String Subject;
    }
}