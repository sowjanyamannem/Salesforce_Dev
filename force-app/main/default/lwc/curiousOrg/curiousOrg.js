import { LightningElement,wire,api } from 'lwc';
import senddatainteg from '@salesforce/apex/dataSender.caseFieldsData';
import { getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import status_fields from '@salesforce/schema/Case.Status';
import Priority_fields from '@salesforce/schema/Case.Priority';
import origin_fields from '@salesforce/schema/Case.Origin';

// import case_status from '@salesforce/schema/Case.Status';
// import case_priority from '@salesforce/schema/Case.Priority';
 

export default class CuriousOrg extends LightningElement {
    teams;    
    options=[];
    objectInfoData ;
    defaultRecordTypeId;
    fname ='';
    lname='';
    @api Subject= '';
    caseDescription = '';
    @api Origin;
    @api Status;
    casepriority;

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    wireObjectInfo({ error, data }){
        if(data){
            this.objectInfoData = data; // if you still need it
            this.defaultRecordTypeId = data.defaultRecordTypeId;
        } else if (error) {
             //handle error
        }
    }
    @wire(getPicklistValues, {
        recordTypeId: '$defaultRecordTypeId',
        fieldApiName: status_fields
    })
    pickValues({ error, data }) {
        if (data) {
            this.teams = data.values.map(plValue => {
                return {
                    label: plValue.label,
                    value: plValue.value
                };
            });

        } else if (error) {
            console.log(error);
        }
    }

        // @wire( getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Priority_fields } )
        // wiredData( { data } ) {
        //     console.log( 'Inside Get Picklist Values' );
        //     if ( data ) {
        //         console.log( 'Data received from Picklist Field ' + JSON.stringify( data.values ) );
        //         this.options2 = data.values.map( objPL2 => {
        //             return {
        //                 label: `${objPL2.label}`,
        //                 value: `${objPL2.value}`
        //             };
        //         });
        //         console.log( 'Options are ' + JSON.stringify( this.options2 ) );
        //     }
        // }
            @wire( getPicklistValues, { recordTypeId: '$defaultRecordTypeId', fieldApiName: origin_fields } )
            wiredData( { data } ) {
                console.log( 'Inside Get Picklist Values1' );
                if ( data ) {
                    console.log( 'Data received from Picklist Field ' + JSON.stringify( data.values ) );
                    this.options = data.values.map( objPL3 => {
                        return {
                            label: `${objPL3.label}`,
                            value: `${objPL3.value}`
                        };
                    });
                    console.log( 'Options are ' + JSON.stringify( this.options3 ) );
                }
            }
    
    // ( { error, data } ) {
    //     console.log( 'Inside Get Picklist Values' );
    //     if ( data ) {
    //         console.log( 'Data received from Picklist Field ' + JSON.stringify( data.values ) );
    //         this.options = data.values.map( objPL => {
    //             return {
    //                 label: `${objPL.label}`,
    //                 value: `${objPL.value}`
    //             };
    //         });
    //         console.log( 'Options are ' + JSON.stringify( this.options ) );
    //     } else if ( error ) {
    //         console.error( JSON.stringify( error ) );
    //     }
    // }
   



    // handleNameChange(event){
    //    if(this.fname === 'FirstName'){
    //     this.fname=event.target.value;
    //    }else if(this.lname === 'LastName'){
    //         this.lname=event.target.value;
    //    }
    // }

    handlestatus(event){
            this.Status =  event.detail.value;
    }

    // handlepriority(){

    // }
    
    handlecaseOrigin(event){
        this.Origin =  event.detail.value;
    }
    // handlecasepriority(event){
    //     this.casepriority =  event.detail.value;
    // }

    handlesubject(event){
            this.Subject = event.target.value;
    }
    // handledescription(event){
    //     this.caseDescription = event.target.value;
    // }

    handlesavedata(){

         //Create Field List....
        // const fields={'Status':this.Status,'Origin': this.Origin,'Subject': this.Subject};
         //create ApiRecord with field...
        // const RecordData = {apiName : 'Case', fields}
         senddatainteg({'Status':this.Status,'Origin': this.Origin,'Subject': this.Subject}).then(Response=>{
            alert('Successfully created the Record.'+Response.Id);
        }).catch(error=>{
            alert('Faillure to create the Record'+error.body);
        });
    }
   
}