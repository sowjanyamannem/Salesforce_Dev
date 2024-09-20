import { LightningElement,api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Imperative_lwc_delete extends LightningElement 
{
    @api recordId;
    deletename(event){
        deleteRecord(this.recordId).then(response=>
            {
            // Navigate to the Account home page
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Account',
                    actionName: 'home',
                },
            });
            
        }).catch(error=>{const event = new ShowToastEvent({
            title: 'Delete Account',
            message:
                'can not delete the account'+message.body.message,
        });
        this.dispatchEvent(event);});
    }
}