import { LightningElement,track,api } from 'lwc';

export default class Lwc_according extends LightningElement 
{
    // @track aadharno;
    // @track pancard;
    // @track idno;
    // @api recordId;
    // // files=[];
    // // fileData

    // handlenumber(event){
    //     this.aadharno=event.target.value;
    // }

    // handlethecard(event){
    //     this.pancard=event.target.value;
    // }

    // handleid(event){
    //     this.idno=event.target.value;
    // }

    selectedAccount;

    handleAccountSelection(event){
        this.selectedAccount = event.target.value;
        alert("The selected Accout id is"+this.selectedAccount);
    }

}