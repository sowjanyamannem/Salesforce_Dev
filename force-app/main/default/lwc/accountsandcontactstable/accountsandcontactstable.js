import { LightningElement,api,track,wire } from 'lwc';
import getAccountlist from '@salesforce/apex/Accounthelper.getAccountlist';

export default class Accountsandcontactstable extends LightningElement {
    @track columns = [
    
    {
        label: 'Account Name',
        fieldName: 'Name',
        type: 'Text',
        sortable: true
    },
    {
        label: 'Contact Name',
        fieldName: 'LastName',
        type: 'text',
        sortable: true
    }
    ];


    @track error;
    @track AccountList;
    @wire(getAccountlist)
    wiredaccount({error,data}){
        console.log('Outside if condition')
        if (data) {
            let AccountData = JSON.parse(JSON.stringify(data));      
            AccountData.forEach(record => {
                if (record.ContactId) {
                    record.recordLink = "/" + record.ContactId;  
                    record.ContactName = record.Contact.LastName;
                }
            });
            this.AccountList=AccountData;
      
            console.log('################################## data is here it was getting :'+JSON.stringify(data));
            }
        else if(error){
            this.error = error;
        }

        

        
    }


}