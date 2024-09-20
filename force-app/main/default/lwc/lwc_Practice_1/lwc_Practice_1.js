import { LightningElement,wire,api } from 'lwc';
import allaccounts from '@salesforce/apex/apexContactsClass.allAccounts';
import allcontacts from '@salesforce/apex/apexContactsClass.accountrelatedcontacts';
export default class Lwc_Practice_1 extends LightningElement {

   
    @wire(allaccounts, {searchtext: "$searchtext"})searchResult({data,error}){

    }

    handleonchange(event){
        let value = event.target.value;
        this.searchtext = value;
    }
    
}