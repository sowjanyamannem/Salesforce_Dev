import { LightningElement,track,wire,api } from 'lwc';
// import method  from '@salesforce/apex/AccountHandler.Retrive_contactsmethod';
import method  from '@salesforce/apex/accountrelatedcontacts.getRelatedList';
export default class Ldt_DataTable_View extends LightningElement {

    @track columns =[ {label:' LastName' , fieldName:'LastName', type:'text'},
    {label:'Phone', fieldName:'phone', type:'phone'},
    
   
  ];
   @api recordId;
  @track conList = [];

  @wire(method)
  contacts;
}