import { LightningElement,wire } from 'lwc';
import allContacts from '@salesforce/apex/apexContactsClass.allContacts';

export default class Searchkey_Contacts extends LightningElement {

    SearchKey = '';
    error; 
    contact;

    @wire(allContacts,{ serachtext: '$SearchKey'}) contact;
    // ({data,error}){
    //     if(data){
    //         this.contact=data;
    //       console.log(data);
           
    //     } else if(error){
    //         this.error = error;
    //     }
       
    // }

    onhandlechange(event){
        this.SearchKey = event.target.value;
        
        console.log(this.SearchKey);

    }

}