import { LightningElement,api,wire } from 'lwc';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

import name_field from '@salesforce/schema/Account.Name';
import phone_field from '@salesforce/schema/Account.Phone';

export default class NewCOMP extends LightningElement {
    @api recordId;
     
    //Message= 'Public response';
    //recordId;

    @wire(getRecord, {recordId: '$recordId', fields: [name_field , phone_field ] })
    record;

  get name(){
     return this.record.data ? getFieldValue(this.record.data, name_field): '';
  }

  get phone(){
    return this.record.data ? getFieldValue(this.record.data, phone_field): ''; 
  }



}