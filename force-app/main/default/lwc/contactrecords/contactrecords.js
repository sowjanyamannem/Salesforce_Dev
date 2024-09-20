import { LightningElement ,api, wire } from 'lwc';
import findbycontact from '@salesforce/apex/contactscontroller.findbycontact';

export default class Contactrecords extends LightningElement {
    columns =  [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName'},
        { label: 'Email', fieldName: 'Email', type: 'email' },    
    ];
    @api accountId;
    @wire(findbycontact ,{accountId:'$accountId'}) contacts;
}