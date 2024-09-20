import { LightningElement,wire,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Job_Appilication__c_Object from '@salesforce/schema/Registration__c';
import PICKLIST_FIELD_FIELD from '@salesforce/schema/Registration__c.Registration_status__c';
//import Event__c from '@salesforce/schema/Event__c';
import findAccounts from '@salesforce/apex/registration_form_class.getregistrationrecords';

export default class Registration_Form extends LightningElement {
    
    @api name;
    @api email;
    @api status1;
    searchKey = '';
    accounts = [];
    @api selectedEventId = '';

    @wire( getObjectInfo, { objectApiName: Job_Appilication__c_Object } )
    objectInfo;

    @wire( getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', 
        fieldApiName: PICKLIST_FIELD_FIELD  } )
    wiredData( { error, data } ) {
    console.log( 'Inside Get Picklist Values' );
    if ( data ) {
    console.log( 'Data received from Picklist Field ' + JSON.stringify( data.values ) );
    this.options = data.values.map( objPL => {
    return {
    label: `${objPL.label}`,
    value: `${objPL.value}`
    };
    });
    console.log( 'Options are ' + JSON.stringify( this.options ) );
    } else if ( error ) {
    console.error( JSON.stringify( error ) );
    }
    }


    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handleAccountChange(event) {
        this.selectedEventId = event.target.value;
        console.log('here is the Event records:',this.selectedEventId);
    }

    handlename(event){
       this.name = event.target.value;
    }

    handleemail(event){
        this.email = event.target.value;
    }
    handlestatus(event){
        this.status1 =event.detail.value;
        console.log( 'New Value selected is ' + JSON.stringify( this.status1 ) );
    }

    handleSearch() {
        findAccounts({ searchTerm : this.searchKey })
            .then(result => {
                console.log('result',result);
                this.accounts = result; 
                console.log('here accounts are',this.accounts );
                this.accountOptions = result.map(acc => ({ label: acc.Name, value: acc.Id }));
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }

    

     handleCreateRecord(){
        const fields = {
            Name: this.name, // Example name for the new record
            Email__c: this.email,
            associated_event__c : this.selectedEventId // Linking to the selected account 
        };
        console.log('fields---in hsndle--',JSON.stringify( fields));
        
        const recordInput = { apiName: 'Registration__c', fields };

        createRecord(recordInput).then(response=>{
            console.log('--,...>><<<>>>>',response);
            alert('Successfully created the Record.'+response.id);
        }).catch(error=>alert('here the error is'+error.body.message));
    }
}