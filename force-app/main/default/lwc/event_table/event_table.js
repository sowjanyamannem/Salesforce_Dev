import { LightningElement, api} from 'lwc';
import getComdeyRecord from '@salesforce/apex/event_class.getComdeyRecord';
// import propertyName from "@salesforce/community/property";
import IMAGE from "@salesforce/resourceUrl/art";
import IMAGE1 from "@salesforce/resourceUrl/veena";
import IMAGE2 from "@salesforce/resourceUrl/comedy";
import IMAGE3 from "@salesforce/resourceUrl/band_1";
import { getRecord } from 'lightning/uiRecordApi';
import getComdeyRecord1 from '@salesforce/apex/event_class.eventrelateddetails';

// import {loadStyle} from 'lightning/platformResourceLoader';
// import COLORS from '@salesforce/resourceUrl/colours';

// const COLUMNS = [
//     {label:'Event Name', fieldName:'Name',  cellAttributes:{
//         class:{fieldName:'accountColor'}
//     }}
// ];	

export default class Event_table extends LightningElement {

    calledones=false;
    artLogo = IMAGE;
    veenaLogo = IMAGE1;
    comedyLogo = IMAGE2;
    bandLogo = IMAGE3;
    @api eventdatas = [];
    @api eventdatas1 = [];
    @api eventdatas2 = [];
    @api eventdatas3 = [];
    eventdatas = false;
    eventdatas1 = false;
    eventdatas2 = false;
    // tableData
    // columns = COLUMNS
    // isCssLoaded = false

//     @wire(getAccounts) 
//     eventhalendler({data,error}){
//     if(data){
        
//         console.log(data);
//     }
//     else if(error){
//         console.error(error);
//     }
//   }


  
//   renderedCallback() {
//     if (this.isCssLoaded) return;
//     this.isCssLoaded = true;
//     loadStyle(this, COLORS)
//         .then(() => {
//             console.log("CSS Loaded Successfully");
//         })
//         .catch(error => {
//             console.error("Error in loading the CSS:", error);
//         });
// }


    // data;
    // columns = [{ label:'label', fieldName:'Name', type:'text' }
    // ];

    // @wire(getAccounts) eventhandler({data,error}){
    //     if(data){
    //         this.data = data;
    //     }else if(error){
    //         this.data = undefined;
    //     }
    // }
    //   newdata=[];
    // renderedCallback(){
    //     if(!this.calledones){
    //         this.calledones=true
    //         this.template.querySelectorAll("span").forEach((inputele)=>{
    //             inputele.addEventListener("mouseover",(event)=>{
    //                 this.data = `${event.target.title}`;
    //                 console.log("render call back :"+this.data );
    //             })
    //         })
    //             }
    // }

    
   

    detailsdataevent2 =true;
    variableart = true;
    handleClickart(event){
        this.variableart = false;
        this.detailsdataevent2 = false;
        var eventname = event.currentTarget.dataset.eventname;
        console.log('check event name',eventname);
        getComdeyRecord({eventId: eventname }).then((result)=>{console.log('----------',result);
            this.eventdatas2 = result;
        }).catch((error)=> {console.log(error);})
    }

    detailsdataevent1 = true;
    variableveena = true;
    handleClickveena(event){
       this.variableveena = false;
       this.detailsdataevent1 = false;
        var eventname = event.currentTarget.dataset.eventname;
        console.log('check event name',eventname);
        getComdeyRecord({eventId: eventname }).then((result)=>{console.log('----------',result);
            this.eventdatas1 = result;}).catch((error)=> {console.log(error);})
    }

    detailsdataevent = true;
    variabledata = true;
    handleClickcomedy(event){
        this.variabledata = false;
       this.detailsdataevent = false;
        console.log();
        console.log(event);
        console.log(event.currentTarget.dataset);
        var eventName = event.currentTarget.dataset.eventname;
        console.log('check event name',eventName);
        console.log();
        getComdeyRecord({eventId: eventName})
        .then((result)=>{
            console.log('----',result);
            this.eventdatas = result;
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    variableband = true ;
    detailsdataevent3 = true;
    handleClickband(event){

        this.variableband = false;
        this.detailsdataevent3 = false;
        var eventname = event.currentTarget.dataset.eventname;
        console.log('check event name',eventname);
        getComdeyRecord({eventId: eventname }).then((result)=>{console.log('----------',result);
            this.eventdatas3 = result;
        }).catch((error)=> {console.log(error);})

    }

}