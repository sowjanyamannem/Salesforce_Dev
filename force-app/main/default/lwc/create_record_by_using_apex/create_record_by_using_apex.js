import { LightningElement,track } from 'lwc';
import recorddetails from '@salesforce/apex/Create_record_by_using_apex.recorddetails';

export default class Create_record_by_using_apex extends LightningElement 
{
@track firstname;
@track lastname;
@track phone;
@track email;


handlefirstname(event){
    this.firstname=event.target.value;
}
handlelastname(event){
  this.lastname=event.target.value;
}
handleemail(event){
    this.email=event.target.value;
}
handlephone(event){
   this.phone=event.target.value;
}
handlebutton(){
    recorddetails( {FName :this.firstname,
        LName:this.lastname,
        phone1:this.phone,
        email1:this.email}).then(result=>{alert('the record is created sucessfully',result)}).catch(error=>{alert('the record is not at created',error.body.message)});

}
}