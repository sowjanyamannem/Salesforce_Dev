import { LightningElement,track,wire } from 'lwc';
import getcontacts from '@salesforce/apex/get_contacts_wire.get_contacts_wire1';
import { updateRecord } from 'lightning/uiRecordApi';
import firstName from '@salesforce/schema/Contact.FirstName';
import lastName from '@salesforce/schema/Contact.LastName';
import Id_Field from '@salesforce/schema/Contact.Id';
import refreshApex from '@salesforce/apex';

const colm = [
    {label:'First Name',fieldName:'FirstName',type:'text', editable:true},
    {label:'Last Name',fieldName:'LastName',type:'text', editable:true},
    {label:'Email',fieldName:'Email',type:'email'},
    ];
export default class Get_contacts_wire extends LightningElement 
{   
    
    @track col= colm;
    @track draftvalues= [];
    // fields ={};
    @wire(getcontacts) stored;

    handlesave(event){
        console.log('the save button is called');
        const fields ={};
        console.debug('the console is Here :',fields);
        fields[Id_Field.fieldApiName] = event.detail.draftvalues[0].Id;
        console.debug('the console is Here :',fields);
        fields[firstName.fieldApiName] = event.detail.draftvalues[0].FirstName;
        console.debug('the console is Here :',fields);
        fields[lastName.fieldApiName] = event.detail.draftvalues[0].LastName;
        console.debug('the console is Here :',fields);
        
        const recordData = {fields};
        updateRecord(recordData).then(response=>{
            console.log('the record values-->',response);
            alert('record  update is successfull');
            this.draftvalues=[];
            return refreshApex(this.stored);
        }).catch(error=>{alert('An error has been occured during refrsh'+error.message.body);
    });
    }
}