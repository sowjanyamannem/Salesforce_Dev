import { LightningElement,api,wire,track } from 'lwc';
import getcontacts  from '@salesforce/apex/display_urls.getcontacts';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class Display_url_in_table extends LightningElement 
{

    @track isedit=false;
    @track itsurl=false;
    @track itsnoturl=false;
    @track colorright;
    @track colorleft='brand';
    @track contactNames=true;
    @track currenturls = [];
    @track editcon=[];
    @api ele;
    renderTable = false;


    connectedCallback(){
        getcontacts({Id:this.recordId})
        .then(result=>{
            this.renderTable = true;
            result.forEach(ele=>{
            this.editcon.push({
                Id: ele.Id,
                FirstName : ele.FirstName,
                LastName:ele.LastName,
                Email:ele.Email,
                URL : ele.URL,
                isedit:false,
            
            })
            console.log(this.editcon);
        })})

    }
    @wire(getcontacts)
    wiredmethod({data,error}){
        if(data){
            console.log('inside if');
            this.currenturls=data;
            this.error=undefined;
            console.log(data);
            console.log('currrentUrls>>>>>>>>>>>>>>>>>>>>>>>>>'+currenturls);
        }
        else{
            console.log('inside else');
            this.error=error;
            console.log(error);
        }
    }

    handleurl(){
        this.itsurl = true;
        this.itsnoturl=false;

        this.colorright='neutral';
        this.colorleft='brand';
        
        getcontacts ().then(result=>{
            this.withurl=result;
            console.log(this.withurl);
        }).catch(error=>{alert('here it is an error',error)}) 

    
    
    }

    handlenoturl(){
        this.itsnoturl=true;
        this.itsurl = false;
        this.colorleft='neutral';
        this.colorright='brand';
     
        getcontacts ().then(result=>{
            this.withouturl=result;
            console.log(this.withouturl);
        }).catch(result=>{alert('Here is an Error',error)}) 
     }

     editContact(event){
        var selectedId = event.currentTarget.dataset.id;
        console.log('check id'+selectedId);
        let contacts1 = this.currenturls.withouturl.find(ele=>ele.Id === selectedId);
        console.log('Here the data is '+JSON.stringify(contacts1));
        contacts1.isedit = true;
        if(contacts1.isedit = true){
            this.field = true;
            this.cfield = true;
        }
        else{
            this.field = false;
            this.cfield = false;
        }
     }

     handleEdit(event){
     let eachitem = this.display.find(ele=> ele.Id === this.currentId);
     eachitem.isChanged=true;
     console.log(JSON.stringify(eachitem));
     if(event.target.label== 'FirstName')
     {
        eachitem.FirstName=event.target.value;
     }
     else if(event.target.label == 'LastName'){
        eachitem.LastName=event.target.value;
     }
     else if(event.target.label == 'Email'){
        eachitem.Email=event.target.value;
     }
     else if(event.target.label== 'URL'){
        eachitem.URL=event.target.value;
     }
     }

}