public class connectedorgintegration_ts {
    static String clientId = '3MVG9wt4IL4O5wvKgfeu2E87LbMUoXH9eCeuIAZAKoy8bDRmVr1HHPXPvzcnpHODul0xjt.4O7XE16QUz_c8c';
    static String clientSecret = '76B7DD6B388C1EE414F64E1DF1493E862C6581B0F0761D3B200775D2DD7DF32D';
    static String username = 'sowji119103@brave-bear-sn146l.com';
    static String password = 'Sowjanya119103@salesforce';
    public class resWrapper{
        public String id;
        public String access_token;
    }
    public static String dataToOrg(){
        string reqBody = 'grant_type=password&client_id=' + clientId + '&client_secret=' + clientSecret + '&username=' + username + '&password=' + password;
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setBody(reqbody);
        req.setEndPoint('https://login.salesforce.com/services/oauth2/token');//Set Endpoint URL Of the Source Org Webservice Class
        HTTP http = new HTTP();
        HttpResponse res = http.send(req);
        resWrapper response = (resWrapper)JSON.deserialize(res.getBody(),resWrapper.class);
        System.debug('response--->>>'+response.access_token);
        return response.access_token;
    }
    @AuraEnabled
    public static String createAccountMethod(String dataVal){
        String getData;
        String accessToken = dataToOrg();
        if(accessToken != null) {
                    //Set Endpoint URL Of the Target Org Webservice Class
                    String endPoint = 'https://raagvitech-1c1-dev-ed.develop.my.salesforce.com/services/apexrest/getData/';
                    Http h2 = new Http();
                    HttpRequest req1 = new HttpRequest();
                    req1.setHeader('Authorization','Bearer ' + accessToken);
                    req1.setHeader('Content-Type','application/json');
                    req1.setHeader('accept','application/json');
                    req1.setMethod('POST');
                    req1.setBody(JSON.serialize(dataVal));
                    req1.setEndpoint(endPoint);
                    HttpResponse res1 = h2.send(req1);
                    Object mapStr = JSON.deserializeUntyped(res1.getBody());
                    String responseBody =(String) mapStr;
                    getData = responseBody.replace('"','');
        }
        return getData;
    }

}