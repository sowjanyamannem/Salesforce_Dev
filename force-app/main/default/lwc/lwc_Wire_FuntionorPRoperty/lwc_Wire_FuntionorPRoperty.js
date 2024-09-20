import { LightningElement,track,wire } from 'lwc';
import findingcontacts from '@salesforce/apex/lwc_Wire1.findingcontacts';

export default class Lwc_Wire_FuntionorPRoperty extends LightningElement 
{
    @track searchkey;
    //Wire a Property
    @wire(findingcontacts,{ searchtext: '$searchkey' }) contact;




    searchme(event){
        this.searchkey=event.target.value;
    }

    
   
}