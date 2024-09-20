public with sharing class WeatherAPI {
   @AuraEnabled
    public static string getweather(String city) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:WeatherApi/current.json?q='+city);
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        return res.getBody();

    }
}