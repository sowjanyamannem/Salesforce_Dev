import { LightningElement, track,wire,api } from 'lwc';
import getAccountlist from '@salesforce/apex/Accounthelper.getAccountlist';

export default class Getaccountcontactstables extends LightningElement {
    @track finalList=[
    
    ];
    @track AccountList;
    @api recordId;
    @wire(getAccountlist)
    wiredaccount({data}){
       
        if (data) {
            this.AccountList=data;
      
            console.log('=========data is here it was getting :'+JSON.stringify(data));
           // this.displayRecords();
        }
    }
    // displayRecords(){
    //     console.log('inside of method??????????????????????????????????');
    //     this.AccountList.forEach(element=>{
    //         console.log('inside of for each loop>>>>>>>>>>>>>>>>>>>>');
    //         var dummyObj = {};
    //         var contactString  = '';
    //         if(element.Contacts){
    //             element.Contacts.forEach(ele=>{
    //                 console.log('inside of 2 for loop>>>>>>>>>>>>>>>>>>>>');
    //                 contactString = contactString + ',' + ele.LastName;
    //                 console.log('inside of 2 for loop++++++++++++++++++++++++',contactString);
    //             })
    //         }
           
    //         dummyObj[element.Name]  = contactString;
    //         this.finalList.push(dummyObj);
    //         console.log('checl finalist>>>>>>>>>>>>>>',JSON.stringify(this.finalList));
    //     })
    }
// }