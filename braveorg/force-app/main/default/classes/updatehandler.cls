public class updatehandler {
    
    public  void updatedata(List<Contact> contactslist){
        List<Contact> contacts= new  List<Contact>();
        for(Contact con: contactslist ){
            Contact contacts1 = new Contact();
            contacts1.FirstName = con.FirstName;
            contacts1.LastName = con.LastName;
            contacts1.Phone = con.Phone;
            contacts.add(con);
        }
        update contacts;
    }
  

}