import { LightningElement ,track,wire,api} from 'lwc';
import contactswithaccounts from '@salesforce/apex/contactswithaccounts.getcontacts';
import getoppolist from '@salesforce/apex/opportunitycountroller.getoppolist'

export default class Lightning_custom extends LightningElement {
    @track contactlist;
    contactlist=[];
    @api recordId;
    wiredActivities;

    connectedCallback(){
        contactswithaccounts({sourceaccounts : this.recordId}).then(result=>{
            this.contactlist = result; 
        })
    }

    // connectedCallback(){
    //     getoppolist({accountIds : this.recordId}).then(result=>{
    //         this.newoppolist = result;
    //     })
    // }


    @wire(contactswithaccounts, {sourceaccounts : '$recordId'})
    wiredclass(value){
        this.wiredActivities = value;
        const {data, error} = value ;
        if(data){
            console.log('Data========> '+JSON.stringify(this.filesList));
        }
        if(error){
            console.log(error);
        }

    }
}