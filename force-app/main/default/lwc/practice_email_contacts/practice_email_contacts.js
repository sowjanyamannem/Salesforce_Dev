import { LightningElement,wire,api,track } from 'lwc';
import getResults from '@salesforce/apex/PRACTICE_email_class.getResults';
import getEmailTemplate from '@salesforce/apex/PRACTICE_email_class.getEmailTemplate';
//import getSelectedTemplate from '@salesforce/apex/PRACTICE_email_class.getSelectedTemplate';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import sendEmail from '@salesforce/apex/PRACTICE_email_class.sendEmail';
import getEmailBody from '@salesforce/apex/PRACTICE_email_class.getEmailBody';
import Email from '@salesforce/schema/Contact.Email';

export default class LwcCustomLookup extends LightningElement {
    @api objectName = 'Contact';
    @api fieldName = 'Name';
    @api selectRecordId = '';
    @api selectRecordName;
    @api Label;
    @api searchRecords = [];
    @api required = false;
    @api iconName = 'action:new_account'
    @api LoadingText = false;
    @track txtclassname = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag = false;
    @track iconFlag =  true;
    @track clearIconFlag = false;
    @track inputReadOnly = false;
    @track emailrecordName='';
    @track emailrecords=[];
    @track templateselected;
    @track selectedtemplateData;
    @track selectedtemplateDataBody;
    @track selectedtemplateDataSubject;
    @track templateId = null;
    @api recordId
    toAddress
    searchField(event) {
        var currentText = event.target.value;
        console.log('currentText>>>>>>>>.'+currentText);
        this.LoadingText = true;
        
        getResults({ ObjectName: this.objectName, fieldName: this.fieldName, value: currentText  })
        .then(result => {
            this.searchRecords= result;
            this.LoadingText = false;
            
            this.txtclassname =  result.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(currentText.length > 0 && result.length == 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }

            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
        })
        .catch(error => {
            console.log('-------error-------------'+error);
            console.log(error);
        });
        
    }
    
   setSelectedRecord(event) {
        var currentRecId = event.currentTarget.dataset.id;
        var selectName = event.currentTarget.dataset.name;
        this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        this.iconFlag = false;
        this.clearIconFlag = true;
        this.selectRecordName = event.currentTarget.dataset.name;
        console.log('selectetd contact',currentRecId)
        this.selectRecordId = currentRecId;
        console.log('selectetd id',this.selectRecordId)
        
        this.inputReadOnly = true;
        const selectedEvent = new CustomEvent('selected', { detail: {selectName, currentRecId}, });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
    
    resetData(event) {
        this.selectRecordName = "";
        this.selectRecordId = "";
        this.inputReadOnly = false;
        this.iconFlag = true;
        this.clearIconFlag = false;
       
    }

 //Modal popup
 @track isModalOpen = false;
 openModal() {
     // to open modal set isModalOpen tarck value as true
     this.isModalOpen = true;
 }
 closeModal() {
     // to close modal set isModalOpen tarck value as false
    
     
  this.isModalOpen = false;
     
 }
 submitDetails() {
     // to close modal set isModalOpen tarck value as false
     //Add your code to call apex method or do some processing

     this.isModalOpen = false;

 }



    @wire(getRecord,{recordId:'$selectRecordId',fields:[Email]})
        emailHandler({data,error}){
            if(data){
                console.log(data);
                this.toAddress = getFieldValue(data,Email);
                console.log('Record Email is', this.toAddress);
            }
            if(error){
                console.error(error);
            }
        }

    handleAddressChange(event){
        this.toAddress = event.target.value;
    }





//email templates
    @wire(getEmailTemplate)
    retriveEmailTemplate(data,error){
    { if(data)
        {
                this.emailrecords = data;
                this.error = undefined;
    
       }
        else
       {
                this.error = error;
                this.data=undefined;
       }

    }
    
}

 //From address
 handleFrom(event)
 {
     this.fromadd = event.target.value;
 }

//To address
 // handleTo(event)
 // {
    
 // }

//subject
 handleSub(event)
 {
     this.sub= event.target.value;
 }  

//body
 handleBody(event)
 {
     this.body= event.target.value;
 }
 // send mail
    handleSend(){
    //     console.log('Send button clicked!!!')
    //     getEmailBody({templateId:this.templateId,contactId:this.selectRecordId})
    //    // getEmailBody({ body:this.selectedtemplateDataBody, toSend:this.toAddress, subject:this.selectedtemplateDataSubject})
    //     .then(result=>{
    //         console.log(result);
    //     }).catch(error=>{
    //         console.error(error);
    //     })
    console.log('Send button clicked!!!')
    sendEmail({nameSelected:this.templateselected,name:this.selectRecordName})
    .then(result=>{
                 console.log(result);
             }).catch(error=>{
                 console.error(error);
             })
    }

 emailTemplateSelected(event){
    
    this.templateselected = event.currentTarget.value;
    console.log('template ---------------------->',this.templateselected);
    getEmailBody({templateName:this.templateselected,contactId:this.selectRecordId})
       // getEmailBody({ body:this.selectedtemplateDataBody, toSend:this.toAddress, subject:this.selectedtemplateDataSubject})
        .then(result=>{

            console.log('The merge data',result);
            this.selectedtemplateDataBody = result.emailBody;
            this.selectedtemplateDataSubject = result.subject;
        }).catch(error=>{
            console.error('Merge Error',error);
        })


  }
}