import { LightningElement, track , wire } from 'lwc';
import methodName1 from '@salesforce/apex/lwc_GetContacts.methodName1';
import {updateRecord} from 'lightning/uiRecordApi';
import{refreshApex} from '@salesforce/apex';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import ID_Field from '@salesforce/schema/Contact.Id'
const colm=[ { label:'First Name',  fieldName:'FirstName', type:'text' ,editable:true},
            { label:'Last Name',  fieldName:'LastName', type:'text' ,editable:true },
            { label:'Phone',  fieldName:'Phone', type:'Phone' },
            { label:'Email',  fieldName:'Email', type:'Email' },
        ];
export default class Lwc_getcon604 extends LightningElement {
     @track col = colm;
     @track draftvalue=[];
     @wire(methodName1)  get;

     saveme(event){
         const fields={};
         fields[ID_Field.fieldApiName] = event.detail.draftvalue[0].Id;
         fields[FirstName.fieldApiName]=event.detail.draftvalue[0].FirstName;
         fields[LastName.fieldApiName]=event.detail.draftvalue[0].LastName;

         const record = {fields};
          updateRecord(record).then(respond=>{
              alert('the record is updated sucessfully');
              this.draftvalue=[];
              return refreshApex(this.get);
          }).catch(error=>{
              alert('an error is encounter during referesh '+error.body.message);
          });
     }
}