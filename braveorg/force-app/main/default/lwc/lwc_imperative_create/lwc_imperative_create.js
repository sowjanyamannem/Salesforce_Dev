import { LightningElement,track} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class Lwc_imperative_create extends LightningElement 
{
    @track name;
    @track phone;
    @track fax;
    @track industry 

    callname(event){
            this.name= event.target.value;
    }

    callPh(event){
        this.phone= event.target.value;
    }

    callFx(event){
        this.fax= event.target.value;
    }

    callInd(event){
        this.industry= event.target.value;
    }
    callme(event){
        //create field list
        const fields1= {'Name':this.name,'Phone':this.phone,'Fax':this.fax,'Industry':this.industry};
        //create api record with fields
        const recorddata = {apiName:'Account',fields1}
        // call Immperation
        createRecord(recorddata).then(response=>{
            alert('the record creation is success'+response.Id);
        }).catch(error=>{
            alert('the error is'+error.body.message);
        });
    }

}