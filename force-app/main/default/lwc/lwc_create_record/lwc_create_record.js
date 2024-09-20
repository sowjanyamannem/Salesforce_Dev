import { LightningElement,track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';

export default class Lwc_create_record extends LightningElement 
{

  @track name;
  @track phone;
  @track fax;
  @track industry;


   callnm(event){
       this.name=event.target.value;
    }

    callph(event){
        this.phone=event.target.value;
    }

    callfx(event){
         this.fax=event.target.value;
    }

    callin(event){
        this.Phone=event.target.value;  
    }
     
    
    callme(){
    const fields={'Acoount Name':this.name,'Last Name':this.phone,'Fax': this.fax, 'industry':this.industry};
    console.log('the values are'+fields);
    const object={apiName:'Account',fields };
    createRecord(object).then(Response=>{
        alert('SUCESS '+Response.id)}).catch(
            error=>{
                alert('error'+error.body.message)
            }
        );
    }

}