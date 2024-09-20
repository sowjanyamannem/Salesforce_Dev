import { LightningElement,wire,api, track  } from 'lwc';
// import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Job_Appilication__c_Object from '@salesforce/schema/Job_Appilication__c';
import Branch__c_Field from '@salesforce/schema/Job_Appilication__c.Branch__c';
import saveRecord from '@salesforce/apex/FileUploaderClass.saveContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const MAX_FILE_SIZE = 2097152;

export default class Path_status extends LightningElement
 { 
    uploadedFiles = []; file; fileContents; fileReader; content; fileName
    @track filesData = [];
     @api recordId;
     showSpinner = false;
     currentvalues='1';
    @track firstname='';
    @track LastName='';
    @track MotherName='';
    @track FatherName='';
    @track Phone='';
    @track Email='';
    @track PANnumber='';
    @track Aadhar='';
    @track Address='';
    @track TenthschoolName='';
    @track TenthPercentage='';
    @track IntercollegeName='';
    @track InterPercentage='';
    @track BtechCollegeName='';
    @track Branch='';
    @track Skills='';
    @track currentcompanyName='';
    @track CurrentPackage='';
    @track currentdesignation='';
    @track Experience='';
    @track Domain='';
    @track expecetedCTC='';
    
    @wire( getObjectInfo, { objectApiName: Job_Appilication__c_Object } )
    objectInfo;

    @wire( getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', 
                                fieldApiName: Branch__c_Field  } )
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
    handlebranch(event){
        console.log( 'New Value selected is ' + JSON.stringify( event.detail.value ) );
    }
    @track currentvalues = '';
    selectedvalue 
    // pathHandler(event){
    //     let targetvalue= event.currentvalues.value;
    //     let selectedvalue =event.currentvalues.value;
    //     this.currentvalues=targetvalue;
    //     this.selectedvalue =selectedvalue;
    // }
      

    removeReceiptImage(event) {
        var index = event.currentTarget.dataset.id;
        this.filesData.splice(index, 1);
    }
    
    showToast(title, variant, message) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                variant: variant,
                message: message,
            })
        );
    }




    onFileUpload(event) {  
        if (event.target.files.length > 0) {  
            for(var i=0;i< event.target.files.length; i++){
          this.uploadedFiles = event.target.files;  
          this.fileName = event.target.files[0].name;  
          this.file = this.uploadedFiles[0];  
         
          if (this.file.size > this.MAX_FILE_SIZE) {  
            // alert("File Size Can not exceed" + MAX_FILE_SIZE); 
            this.showToast('Error!', 'error', 'File size exceeded the upload size limit.');
            return; 
          }  
          let file = event.target.files[i];
          let reader = new FileReader();
            reader.onload = e => {
                    var fileContents = reader.result.split(',')[1]
                    this.filesData.push({'fileName':file.name, 'fileContent':fileContents});
                };
                reader.readAsDataURL(file);
            }
        }  
      }  
     
    handleOnStepClick(event) {
        const isInputsCorrect = [
            ...this.template.querySelectorAll("lightning-input")
                    ].reduce((validSoFar, inputField) => {
                      inputField.reportValidity();
                      return validSoFar && inputField.checkValidity();
                    }, true);
                    if(isInputsCorrect){

        this.currentvalues = event.target.value;
                    }
    }
    get isStepOne() {
        return this.currentvalues === "1";
    }
    get isStepTwo(){
        return this.currentvalues === "2";
    }
    get isStepThree(){
        return this.currentvalues === "3";
    }
    get isEnableNext() {
       
        return this.currentvalues != "3";
       
    }
    get isEnablePrev() {
        return this.currentvalues != "1";
    }
    get isEnableFinish() {

        return this.currentvalues === "3";
    }
    handleNext(){
        const isInputsCorrect = [
            ...this.template.querySelectorAll("lightning-input")
                    ].reduce((validSoFar, inputField) => {
                      inputField.reportValidity();
                      return validSoFar && inputField.checkValidity();
                    }, true);
       if(isInputsCorrect && this.currentvalues == "1"){
            this.currentvalues = "2";
        }
        else if(isInputsCorrect && this.currentvalues == "2"){
            this.currentvalues = "3";
        } inputField.checkValidity();
    }
    handlePrev(){
        if(this.currentvalues == "3"){
            this.currentvalues = "2";
        }
        else if(this.currentvalues = "2"){
            this.currentvalues = "1";
        }
    }
    handlefn(event){
        this.firstname=event.target.value;

    }
    handleln(event){
        this.LastName=event.target.value;
    }
    handlemn(event){
        this.MotherName=event.target.value;
    }
    handleFathern(event){
        this.FatherName=event.target.value;
    }
    handlep(event){
           this.Phone=event.target.value;
    }
    handleemail(event){
         this.Email=event.target.value;
    }
    handlepan(event){
        this.PANnumber=event.target.value;
    }
    handleaadhar(event){
        this.Aadhar=event.target.value;
    }
    handleaddress(event){
         this.Address=event.target.value;
    }
    handletsc(event){
       this.TenthschoolName=event.target.value;
    }
    handletp(event){
       this.TenthPercentage=event.target.value;
    }
    handleicn(event){
         this.IntercollegeName=event.target.value;
    }
    handleip(event){
        this.InterPercentage=event.target.value;
    }
    handlebcn(event){
        this.BtechCollegeName=event.target.value;
    }
    // handlebranch(event){
    //     this.Branch=event.target.value;
    // }
    handleskills(event){
         this.Skills=event.target.value;
    }
   
    handleccn(event){
        this.currentcompanyName=event.target.value;
    }
    handlecp(event){
        this.CurrentPackage=event.target.value;
    }
    handlecd(event){
        this.currentdesignation=event.target.value;
    }
    handleexp(event){
       this.Experience=event.target.value;
    }
    handledomain(event){
        this.Domain=event.target.value;
    }
    handlectcssss(event){
      this.expecetedCTC=event.target.value;
    }
    
       
    

  
    handleFinish(){      
        
        const fields={ 'sobjectType': 'Job_Appilication__c',
                      'first_name__c':this.firstname,
                      'Last_Name__c':this.LastName,
                      'Mother_Name__c':this.MotherName,
                      'Father_Name__c':this.FatherName,
                      'Phone__c':this.Phone,
                      'Email__c':this.Email,
                      'PAN_number__c':this.PANnumber,
                      'Aadhar__c':this.Aadhar,
                      'Address__c':this.Address,
                      'X10Th_school_Name__c':this.TenthschoolName,
                      'X10Th_Percentage__c':this.TenthPercentage,
                      'Inter_college_Name__c':this.IntercollegeName,
                      'Inter_Percentage__c':this.InterPercentage,
                      'Btech_College_Name__c':this.BtechCollegeName,
                      'Branch__c':this.Branch,
                      'Skills__c':this.Skills,
                      'current_company_Name__c':this.currentcompanyName,
                      'Current_Package__c':this.CurrentPackage,
                      'current_designation__c':this.currentdesignation,
                      'Experience__c':this.Experience,
                      'Domain__c':this.Domain,
                      'expeceted_CTC__c':this.expecetedCTC};

                    //   const reco={apiName:'Job_Appilication__c',fields};   

                    if(this.filesData == [] || this.filesData.length == 0) {
                        this.showToast('Error', 'error', 'Please select files first');
                         return;
                    }
                                     
                      const isInputsCorrect = [
              ...this.template.querySelectorAll("lightning-input")
                      ].reduce((validSoFar, inputField) => {
                        inputField.reportValidity();
                        return validSoFar && inputField.checkValidity();
                      }, true);
                   

                      if (isInputsCorrect) {
                        this.showSpinner = true;
                    saveRecord({recordId : this.recordId,
                        filedata : JSON.stringify(this.filesData),
            
                        contactRec: fields,  
            file: encodeURIComponent(this.fileContents),  
            fileName: this.fileName  
          }).then(Response =>{
            // this.dispatchEvent(new ShowToastEvent({
            // alert( 'Account created the Id is :'+Response.id)
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Record {0} created! See it {1}!',
                variant: 'success',
                messageData: [
                    'salesforce',
                    {
                        url: 'https://raagvitech12-dev-ed.lightning.force.com/lightning/r/Job_Appilication__c/'+Response.id+'/view',
                        label: 'Click Here',
                    },
                ],
            });
            this.dispatchEvent(event);
        }).catch(error=>{
            alert('Error :'+error.body.message)
        }).finally(() => this.showSpinner = false );
       
    }
 
 }

 }