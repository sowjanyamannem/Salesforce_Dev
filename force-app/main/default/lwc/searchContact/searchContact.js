import { LightningElement,wire} from 'lwc';
import getcontacts1 from '@salesforce/apex/allcontacts.getcontacts';

export default class SearchContact extends LightningElement {

    searchKey;
         
        
    @wire(getcontacts1,{searchtext : '$searchKey'}) 
    contact;
       
    
        

    handleonchange(event){
        //console.log("click the button");
            this.searchKey= event.target.value;
        // console.log("the data is here"+searchkey);
       
               
    }
    
}