import { LightningElement,api,track,wire } from 'lwc';
import datamerge from '@salesforce/apex/Custom_email_merge.datamerge';
import emailtemplates from '@salesforce/apex/Custom_email_merge.emailtemplates';
import getResults from '@salesforce/apex/Custom_email_merge.getResults';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import getemailbody from '@salesforce/apex/Custom_email_merge.getemailbody';
import Email from '@salesforce/schema/Contact.Email';
export default class ModalPopupLWC extends LightningElement {
    @track emailtemp='';
    @track selectedtemplateDataBody='';
    @track selectedtemplateData=[];
    @track contactemailsave;
    @api recordId;
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
    @track emailtemplaterecords=[];


    //@track emailselector='';
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
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

    @wire(emailtemplates) 
    wiredtemplate ({data,error}) {
        if (data) {
            this.emailtemplaterecords = data; 
            this.error=undefined;
           
       } 
        else if (error) { 
           this.error = error;  
      }  
      
     }




     @wire(getRecord, {recordId:'$selectRecordId',fields:[Email]}) 
    wiredtemplate1({data,error}) {{
        if (data) {
            this.contactemailsave = getFieldValue(data,Email); 
            // this.error=undefined;           
       } 
        else if (error) { 
           this.error = error;  
      }  }
    
    }



    handlebody(event)
    {
        this.selectedtemplateDataBody = event.detail.value;
        console.log('getting the body ',selectedtemplateDataBody);
    }


    // @wire(getemailbody,{sTemp:'$emailtemp'})
    // wiredbodytemplate({data,error}){
    //     if(data){
    //         this.selectedtemplateData=data;
    //         console.log('the body is getting ',data);
    //         for(let i in this.selectedtemplateData.data){
    //             console.log('the data is here : ',Json.stringify(selectedtemplateData));
    //             this.selectedtemplateDataBody = this.selectedtemplateData.data[i].Body;
    //             console.log('only selected template Body----->',JSON.stringify(this.selectedtemplateData.data[i].Body));
    //         }
    //     }
    //     else if(error){
    //         this.error=error;
    //         console.log(error);

    //     }
    // }
     




 
    
    handleemailtemplate(event){
        this.emailtemp=event.target.value;
        // console.log('here it has all the data',this.emailtemp);



  }
   
    searchField(event) {
        var currentText = event.target.value;
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
        this.selectRecordId = currentRecId;
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

    handletoaddress(event){
        this.contactemailsave=event.target.value;
    }

    handlesendmail(){

        saverecordd({nameisselected:this.emailtemp,name:this.selectRecordName}).then(Response=>{
           alert ('succeed of sending the Mail'+Response)
        }).catch();

    }

}