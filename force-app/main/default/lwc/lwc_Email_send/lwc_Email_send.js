import { LightningElement ,api ,wire ,track } from 'lwc';
import getcontacts from '@salesforce/apex/Email_template_send.getcontacts';

export default class Lwc_Email_send extends LightningElement 
{
    @track selectedRecordName;
 
    handlesearchField(event){
         this.selectedRecordName=event.target.value;
    }

    @wire(getcontacts, {getcon1:'$selectedRecordName'})
    retrievetemplate({data,error}) {
    if(data){
       
        console.log('getting  record',data);
    }
    else if (error){
        this.error=error;
        console.log(error);
    }
  }



}