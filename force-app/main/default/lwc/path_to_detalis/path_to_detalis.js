import { LightningElement,wire,track,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Details__c_Object from '@salesforce/schema/Details__c';
import Education_status1__c_Field from '@salesforce/schema/Details__c.Education_status1__c';



export default class Path_to_detalis extends LightningElement
{
   activeSectionsMessage;
   @track Detailsname;
   @track Personname;
   @track email;
   @track phone;
   currentvalue ;
   selectedValue;
   options = [];
   @track aadharno;
   @track pancard;
   @track idno;
   @api recordId;
   files=[];
   fileData
    @wire( getObjectInfo, { objectApiName: Details__c_Object } )
    objectInfo;
    @wire( getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Education_status1__c_Field } )
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

       
    callbranch(event){     
        console.log( 'New Value selected is ' + JSON.stringify( event.detail.value ) );
       
        this.selectedValue = event.target.value;  
        this.currentvalue=this.selectedValue;
         
    }

    handlesavefn(event){
        this.Detailsname=event.target.value;
    }

    handlesaveln(event){
        this.Personname=event.target.value;
    }

    handlesavemail(event){
       this.email=event.target.value;
    }
  
    handlesavephone(event){
        this.phone=event.target.value;
    }
   
    handlenumber(event){
        this.aadharno=event.target.value;
    }

    handlethecard(event){
        this.pancard=event.target.value;
    }

    handleid(event){
        this.idno=event.target.value;
    }

    handlefile(event){
        const file = event.target.files;
        var reander = new FileReader()
        reander.onload =()=>{
            var base64 = reader.result
            this.fileData = { 
                'filename': file.name,
                'base64' : base64,
                'recordId':this.recordId
            }
             console.log(this.fileData)
        }
        reander.readAsDataURL(file)
    }

    handleClick(){
        //mapping the fields of custom object(details) with values .  
        const fields={'Name':this.Detailsname,'Person_Name__c':this.Personname,'Email__c':this.email,'Phone__c':this.phone,'Education_status1__c':this.selectedValue};
        //Record details to pass the create a method with api name of object. 
         const objname={apiName :'Details__c',fields};

        //to give the record name to the createRecord
        createRecord(objname).then(Response =>{
            alert( 'Account created the Id is :'+Response.id)
        }).catch(error=>{
            alert('Error :'+error.body.message)
        });

    }

}