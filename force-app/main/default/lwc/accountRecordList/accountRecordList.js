import { LightningElement,wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountCountroller.getAccounts';


export default class AccountRecordList extends LightningElement {

    @wire(getAccounts) accounts;
    accountids1;
    handleClick(event){

        event.preventDefault();  
        console.log('here thedata');
        this.accountids1 = event.target.dataset.accountid;  
        console.log('here thedata1');
    }


    // @wire(getAccounts) accounts;
    // accountids1;
    // handleaccounts(){
    //     this.accountids1 = event.target.dataset.accountid;
    // }
    }