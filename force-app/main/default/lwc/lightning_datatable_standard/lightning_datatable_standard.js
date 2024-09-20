import { LightningElement,api,wire,track} from 'lwc';
import method  from '@salesforce/apex/Retrive_contacts.Retrive_contactsmethod';
import recorddetails from '@salesforce/apex/Retrive_contacts.recorddetails';
//import { createRecord } from 'lightning/uiRecordApi';

export default class Lightning_datatable_standard extends LightningElement 
{
    @track columns =[ {label:' Name' , fieldName:'Name', type:'text'},
                      {label:'Phone', fieldName:'phone', type:'phone'},
                     
                    ];
    @track conList = [];
    @track error;

    @track name='';
    @track phone='';
    @track email='';
    @track fax='';

    selectedcontacts;

    @track isShowModal = false;

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

    @wire(method)
    wiredcontacts({
        error,
        data
    }) {
        if (data) {
            console.log("actuval data is: ",data);
            this.conList = data;
            // console.log("data:",this.conList);
        
            console.log("the data is here",JSON.stringify(this.conList));
            //  var conData = JSON.parse(JSON.stringify(this.conList));
            

            // console.log("the conData is here : ",c);
            var newobj={};
             data.forEach(mm =>{
                console.log("the MM data is Here ",mm);
                                 newobj.Id=mm['Id'];
                                 newobj.Name=mm['Name'];
                                 newobj.Phone=mm['Phone']
                                //  console.log(mm);
                                
             });
             
             this.conList.push(newobj);
             console.log("the list is : ",JSON.stringify(this.conList));
           
            //  console.log("the condata data is here : ",conData);
            //  this.conList=JSON.parse(JSON.stringify(conData));
            //  this.wiredcontacts=JSON.parse(JSON.stringify(conList));

                } else if (error) {
            this.error = error;
        }
    }


    namefield(event){
           this.name = event.target.value;
    }

    phonefield(event){
            this.phone = event.target.value;
    } 

    emailfield(event){
           this.email = event.target.value;
    }

    faxfield(event){
        this.fax= event.target.value;
    }
@track selectedAccount;

handleAccountSelection(event){
    console.log("here is event ",event.detail);
    this.selectedAccount = event.target.Name;
    console.log("the vallue is:",JSON.stringify(this.selectedAccount));
    console.log("here is size",this.conList.size());
      if(this.conList.size()>10){
                this.conList.add(this.selectedAccount);
                console.log("the size is : ",JSON.stringify(this.conList));
             }
    
   // alert("The selected Accout id is"+this.selectedAccount);
}



createcontact(event){

    // const fields = {  
    //                 //  'sobjectType': 'Contact',
    //                 //   'LastName ':this.name,
    //                   'Phone':this.phone,
    //                   'Email':this.email,
    //                   'Fax':this.fax
    //               };

    // const recordobj = {apiName:'Contact',fields }
    // console.log("the record obj :", recordobj);
    recorddetails( {
        // FName :this.firstname,
        LName:this.name,
        phone1:this.phone,
        email1:this.email}).then(result=>{alert('the record is created sucessfully',result)}).catch(error=>{alert('the record is not at created',error.body.message)});

}
}