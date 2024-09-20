import { LightningElement,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import Success_Code__c_Field from '@salesforce/schema/Transaction__c.Success_Code__c';
import transcation_OBJECT from '@salesforce/schema/Transaction__c';

import getMessageforsuccesscode from '@salesforce/apex/TransactionFormController.getMessageForSuccessCode';

export default class Scenario6 extends LightningElement {

    message = "";
    name;
    successCode;
   options = [];
    @wire( getObjectInfo, { objectApiName: transcation_OBJECT} )
    objectInfo;
    @wire( getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', 
                                fieldApiName: Success_Code__c_Field  } )
    wiredData( { error, data } ) {
        console.log( 'Inside Get Picklist Values' );
    
        if (data) {
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

    

    // successCodeOptions=[
    //     {label: '101', value: '101'},
    //     {label: '201' , value: '201'},
    //     {label: '301' , value: '301'}
    // ];

    name1(event){
        this.name = event.target.value;
        console.log(this.name);
    }



    Successcode(event){

        console.log( 'New Value selected is ' + JSON.stringify( event.detail.value ) ); 
                this.successCode = this.options;
        this.fetchMessageForSuccessCode();
        console.log('data is here : '+fetchMessageForSuccessCode());
    }

    fetchMessageForSuccessCode(){
        getMessageforsuccesscode({'Success_Code__c': this.successCode}).then(result=>{ this.message = result;}).catch(error => {
            console.error("Error fetching message:", error);
        });   

    }

    // getAccount(){

    // }

    // getmessage(){

    // }



    createthe_record(event){
        console.log("click the button");
        //event.preventDefault();
        const fields={
            // 'sobjectType': 'Transaction__c',
            'Name' : this.name,
            'Message__c' : this.message,
            'Success_Code__c' : this.successCode
            
        }

        const reco={apiName:'Transaction__c',fields};   
        console.log(reco);

        createRecord(reco).then(Response=>{ alert('Successfully created the Record.'+Response.id);}).catch(error=>{ alert('error message'+error.body.message);});
        
    }

}