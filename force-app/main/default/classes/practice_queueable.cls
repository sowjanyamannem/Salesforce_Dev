public class practice_queueable  implements Queueable{
    
    public void execute(QueueableContext qc){
        List<Contact> contacts = [Select Id From Contact Where LastName = 'test'];
        for(Contact con : contacts){
            con.LastName = 'tset';
            update con;
        }
    }

}