import { LightningElement ,wire,track} from 'lwc';
import getCategorypicklist from '@salesforce/apex/CustomerInformation2.getCategorypicklist';
import Durationpicklist from '@salesforce/apex/CustomerInformation2.Durationpicklist';
import statepicklist from '@salesforce/apex/CustomerInformation2.statepicklist';
import statuspicklist from '@salesforce/apex/CustomerInformation2.statuspicklist';
import recordInsert from '@salesforce/apex/CustomerInformation2.recordInsert';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const MAX_FILE_SIZE = 100000000; //10mb 
export default class ListingRecords extends LightningElement
 {
@track typecategory;
@track typeduration;
@track typestate;
@track typestatus;
uploadedFiles = []; file; fileContents; fileReader; content; fileName  
onFileUpload(event) {  
  if (event.target.files.length > 0) {  
    this.uploadedFiles = event.target.files;  
    this.fileName = event.target.files[0].name;  
    this.file = this.uploadedFiles[0];  
    if (this.file.size > this.MAX_FILE_SIZE) {  
      alert("File Size Can not exceed" + MAX_FILE_SIZE);  
    }  
  }  
}
connectedCallback(){
    getCategorypicklist()
           .then(result => {
               let opt = [];
               result.forEach(element => {
                   opt.push({
                       label : element,
                       value : element
                   })
                  });
               this.typecategory = opt;
           })
           Durationpicklist()
                  .then(result => {
                      let opt1= [];
                      result.forEach(element => {
                          opt1.push({
                              label : element,
                              value : element
                          })
                         });
                      this.typeduration = opt1;
                  })
                  statepicklist()
                      .then(result => {
                          let opt2 = [];
                          result.forEach(element => {
                              opt2.push({
                                  label : element,
                                  value : element
                              })
                             });
                          this.typestate = opt2;
                      })
                      statuspicklist()
                          .then(result => {
                              let opt3 = [];
                              result.forEach(element => {
                                  opt3.push({
                                      label : element,
                                      value : element
                                  })
                                 });
                              this.typestatus = opt3;
                          })

       }
     ListingName;
     Category;
     Duration;
     Street;
     City;
     State;
     PostalCode;
     Country;
     Status;
     BasePrice;
     NumberOfDays;
     PricePerPerson;
     GuestMinCapacity;
     GuestMaxCapacity;
     ItemsToBring;
     PickUpLocation; 

     handlechange(event){
        if(event.target.label == 'Listing Name'){
        this.ListingName = event.target.value;  
        //window.console.log('scoreObName ##' + this.scoreObName);
        }
      if(event.target.label == 'Category'){
        this.Category = event.target.value;  
      }
      if(event.target.name == 'Duration'){
        this.Duration = event.target.value;  
      }
      if(event.target.label == 'Street'){
        this.Street = event.target.value;  
      }
      if(event.target.label == 'City'){
        this.City = event.target.value;  
      }
      if(event.target.label == 'State'){
        this.State= event.target.value;  
      }
      if(event.target.label == 'Zip/Postal Code'){
        this.PostalCode = event.target.value;  
      }
      if(event.target.label == 'Country'){
        this.Country = event.target.value;  
      }
      if(event.target.label == 'Status'){
        this.Status = event.target.value;  
      }
      if(event.target.label == 'Base Price'){
        this.BasePrice = event.target.value;  
      }
      if(event.target.label == 'Number of Days'){
        this.NumberOfDays= event.target.value;  
      }
      if(event.target.label == 'Price Per Person'){
        this.PricePerPerson = event.target.value;  
      }
      if(event.target.label == 'Guest Min Capacity'){
        this.GuestMinCapacity = event.target.value;  
      }
      if(event.target.label == 'Guest Max Capacity'){
        this.GuestMaxCapacity = event.target.value;  
      }
      if(event.target.label == 'Items to Bring'){
        this.ItemsToBring = event.target.value;  
      }
      if(event.target.label == 'Pick Up Location'){
        this.PickUpLocation = event.target.value;  
      }
 }
 submitAction(event){
   var fields={};
   fields.Name = this.ListingName;
   fields.Street__c = this.Street;
   fields.City__c = this.City;
   fields.State2__c = this.State;
   fields.Statu__c = this.Status;
   fields.Base_Price__c = this.BasePrice;
   fields.Number_of_Days__c = this.NumberOfDays;
   fields.Additional_Price_per_Person__c = this.PricePerPerson;
   fields.Guest_Min_Capacity__c = this.GuestMinCapacity;
   fields.Guest_Max_Capacity__c = this.GuestmaxCapacity;
   fields.Items_To_Bring__c = this.ItemsToBring;
   fields.Pick_Up_Location__c = this.PickUpLocation;
   fields.Category__c = this.Category;
   fields.Duration__c = this.Duration;
   fields.Zip_Postal_Code__c = this.PostalCode;
   fields.Country__c = this.Country;
   this.fileReader = new FileReader();  
   this.fileReader.onloadend = (() => {  
  this.fileContents = this.fileReader.result;  
  let base64 = 'base64,';  
  this.content = this.fileContents.indexOf(base64) + base64.length;  
  this.fileContents = this.fileContents.substring(this.content);  
  recordInsert();  
});  
this.fileReader.readAsDataURL(this.file);
recordInsert({recievedRec : fields ,file: encodeURIComponent(this.fileContents),  
        fileName: this.fileName })
    .then(conId => {
        if(conId){
     this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Record Saved Successfully: ',
            variant: 'success',
        }),
    );
        }
    });  
}
 resetAction()
{
    this.template.querySelectorAll('lightning-input , lightning-combobox , lightning-input-rich-text')
      .forEach(element =>{
          element.value ='';
      });
}



handleUploadFinished(event) {  
  if (event.target.files.length > 0) {  
    this.uploadedFiles = event.target.files;  
    this.fileName = event.target.files[0].name;  
    this.file = this.uploadedFiles[0];  
    if (this.file.size > this.MAX_FILE_SIZE) {  
      alert("File Size Can not exceed" + MAX_FILE_SIZE);  
    }  
  }  
}  

 }