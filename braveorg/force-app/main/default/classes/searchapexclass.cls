public with sharing class searchapexclass {
    public static List<Contact> searchapexclasscontacts(String searchtext) {

        String key = '%' + searchtext + '%' ;
        Return = [Select Id, LastName,Email,Phone From Contact Where LastName like: key ];

    }
}