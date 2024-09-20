import { LightningElement ,track} from 'lwc';
import sendemail from '@salesforce/apex/ControllerLwcEmailExample.sendemail';

export default class Lwc_sending_mail extends LightningElement 

{
   
    @track email = '';
      
    fromaddress(event){
             if(event.target.name=event.target.value)
             this.email=event.target.value;
    }


    toaadderss(event){
        if(event.target.name=event.target.value)
        this.email=event.target.value;

    }



    handlesaveme(event){
        console.log('send these email'+this.email);
        sendemail({toAddress : this.email,subject: "Subject", body:"Body"});
            

    }

   


}