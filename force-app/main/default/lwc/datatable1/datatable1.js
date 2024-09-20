import { LightningElement, api,track } from 'lwc';
import getAllContacts from '@salesforce/apex/Data1.getAllContacts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Datatable1 extends LightningElement 
{
    @track contactList;
    @api recordId;
    connectedCallback() {
        getAllContacts({ sourceAccount: this.recordId })
            .then(result => {
                this.contactList = result;
            });
        }


        handledelete(event) {
            deleteRecord(event.currentTarget.dataset.id)
              .then(() => {
                  this.dispatchEvent(
                        new ShowToastEvent({
                           title: 'Success',
                           message: 'Record Is Deleted',
                            variant: 'success',
                        }),
                   );
                   this.connectedCallback();
              this.isLoading = false;
                    })
                       .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error',
                               message: error.message,
                                 variant: 'error',
                          }),
                         );
                         this.connectedCallback();
                         this.isLoading = false;
                    });
                }







            
}