import { LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';


export default class Imperative_lwc extends LightningElement 
{

    @track name;
    @track phone;
    @track fax;
    @track accountnumber;

    callname(event){
        this.name = event.target.value;
    }
    callphone(event){
        this.phone = event.target.value;
    }
    callfax(event){
        this.fax = event.target.value;
    }
    callnumber(event){
        this.accountnumber = event.target.value;
    }

    callme(event){

        const fields={'Name': this.name,'Phone':this.phone, 'Fax':this.fax, 'AccountNumber':this.accountnumber};
        //create ApiRecord with field...
        const RecordData = { apiName : 'Account', fields}
        //call imperation
      createRecord(RecordData).then(Response=>{  
        alert('Successfully created the Record.'+Response.id);
      }).catch(error=>{
        alert('Faillure to create the Record'+error.body.message);
      });
        
    }
}