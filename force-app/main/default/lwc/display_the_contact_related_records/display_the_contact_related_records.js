import { LightningElement, track, api } from 'lwc';
import featchsobject from '@salesforce/apex/Modal_LWC_controller.featchsobject';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columns = [{ label: 'Name', fieldName: 'Name' },
{ label: 'Email', fieldName: 'Email', type: 'Email' },
{ label: 'Phone', fieldName: 'Phone', type: 'Phone' }];

export default class Display_the_contact_related_records extends LightningElement {
    @track columns = columns;
    @track accountId;
    @track contactList;
    @track rowOffset = 0;
    @track error;
    @track clickhere = '';
    @track modalHeader = '';
    @track isContact = false;
    @track modalClass = 'slds-modal ';
    @track modalBackdropClass = 'slds-backdrop ';
    @api recordId;
    @api objectApiName;



    connectedCallback() {
        if (this.objectApiName = "Account") {
            this.isContact = false;
            this.modalHeader = "Related contacts";
            this.clickhere = "see Contact Details";

        }
        else if (this.objectApiName = "Contact") {
            this.isContact = True;
            this.modalHeader = "Related Accounts ";
            this.clickhere = "see Account Details";
        }
    }

    handleclick() {
        this.modalClass = 'slds-modal slds-fade-in-open';
        this.modalBackdropClass = 'slds-backdrop slds-backdrop_open';
        featchsobject({ sObjectId: this.recordId })
            .then(result => {
                console.log('RESULT --> ',JSON.stringify(result));
                if (result.accId != null) {
                    this.accountId = result.accId;
                    this.isContact = true;
                    console.log('RESULT --> ',JSON.stringify(result));
                }
                else {
                    this.contactList = result.contactList;
                    this.isContact = false;

                }
                console.log('RESULT --> ',JSON.stringify(result));
            }

            ).catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error Occured',
                    message: 'Error: ' + error.body.message,
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });

    }

    //Removes the classes that hides the Modal
    closeModal() {
        this.modalClass = 'slds-modal ';
        this.modalBackdropClass = 'slds-backdrop ';
    }
}