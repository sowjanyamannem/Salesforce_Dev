import { LightningElement, track,api,wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import downloadfilepdf from '@salesforce/resourceUrl/downloadjs';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

const FIELDS = [
    'Contact.Id','Contact.Name',  'Contact.Account.Name',  'Contact.Phone',
      'Contact.MailingStreet',  'Contact.OtherStreet', ' Contact.Email'
  ];

export default class JsPDFDemo extends LightningElement {

  @track name;
  @track accountName;
  @track email;
  @track billTo;
  @track shipTo;
  @track phone;
  @api recordId;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: FIELDS
  })
  contactData({data,error}){
    if(data){
    console.log('data'+JSON.stringify(data))
        this.name=getFieldValue(data,'Contact.Name');
        this.accountName=getFieldValue(data,'Contact.Account.Name')
        this.email=getFieldValue(data,'Contact.Phone')
        this.billTo=getFieldValue(data,'Contact.MailingStreet')
        this.shipTo=getFieldValue(data,'Contact.OtherStreet')
        this.phone=getFieldValue(data,'Contact.Email')
      }
      else if(error){
        console.log(error)
      }
  }


    jsPdfInitialized = false;
    renderedCallback(){
        console.log(this.contact.data);
        loadScript(this,downloadfilepdf).then(()=>{});
        if(this.jsPdfInitialized ){
            return ;
        }
        this.jsPdfInitialized = true;
    }

    generatePdf(){
        const {downloadfilepdf} = window. downloadfilePDF;
        const doc = new downloadfilepdf();
        
    }

}