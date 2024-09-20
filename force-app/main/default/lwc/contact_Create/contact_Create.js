import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement,track } from 'lwc';

export default class Contact_Create extends LightningElement {

    @track name;
  
    @track phone;

    callname(event){
        this.name=event.target.value;

    }
    // calllastname(event){
    //     this.lastname=event.target.value;

    // }
    callphone(event){
        this.phone=event.target.value;
    }

    callsave(event){
        const fields={'Name': this.name,'Phone':this.phone};
      console.debug('the fufug'+fields);
        const RecordData ={apiName:'Contact',fields}
        
        createRecord(RecordData).then(Response=>
            {
                alert('the Contact record is Successfully created. '+Response.id)}).catch(error=>
                    {
                        alert('the Contact record is Fail to Insert '+error)});

    }
}