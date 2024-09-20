import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
//import getContact from '@Salesforce/apex/AccountController.getContact'
const FIELDS = ['Contact.Name', 'Contact.Phone'];
export default class DisplayContacts extends LightningElement {
    @api recordId;
    name;
    phone;
    contacts;
    apexCon;
    isread = false;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    getContactsRec({ error, data }) {
        if (error) {
           console.log('ERRor',error)
        } else if (data) {
            console.log('The Data is',data);
            this.contact = data;
            this.name = this.contact.fields.Name.value;
            this.phone = this.contact.fields.Phone.value;
        }
    }
}