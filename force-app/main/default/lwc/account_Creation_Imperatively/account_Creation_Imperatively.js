import { api, LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class Account_Creation_Imperatively extends LightningElement {
      @track  name;
      @track phone;
      @track fax;
      @track industry;
      @api recordId;

    callname(event){
        this.name=event.target.value;

    }
    callphone(event){
         this.phone=event.target.value;
    }
    callfax(event){
       this.fax=event.target.value;
    }
    callin(event){
       this.industry=event.target.value;
    }

    savebutton(event){
        //Create Field List....
        const fields={'Name': this.name,'Phone':this.phone, 'Fax':this.fax, 'Industry':this.industry };
        //create ApiRecord with field...
        const RecordData = {apiName : 'Account', fields}
        //call imperation
      createRecord(RecordData).then(Response=>{
        alert('Successfully created the Record.'+Response.id);
      }).catch(error=>{
        alert('Faillure to create the Record'+error.body.message);
      });
    }

    deletedata(event){
        deleteRecord(this.recordId).then().catch();
    }
  }