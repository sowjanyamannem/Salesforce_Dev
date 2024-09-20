import { LightningElement,track,wire } from 'lwc';
//import accounts_searchmethod from '@salesforce/apex/accounts_search.accounts_searchmethod';
import retrieveContactData from '@salesforce/apex/accounts_search.retrieveContactData';

export default class Account_creation extends LightningElement 
{

      @track searchbar;
      

      // @wire(accounts_searchmethod,{ searchtext: '$searchbar' }) account;
     
    
      
   
      // searchme(event){
      //       this.searchbar=event.target.value;
      //      console.log('the search bar is here:',searchbar);
            

      // }


      @track records;
      @track dataNotFound;
      @track currentAccountName;
      @track searchAccountName;
       handleChangeAccName(event){
         this.currentAccountName = event.target.value; 
      //    if(currentAccountName !=''){
      //       this.currentAccountName=this.searchAccountName;
      //    }
               
       }


       handleAccountSearch(){
            this.searchAccountName = this.currentAccountName;
         }

       @wire (retrieveContactData,{keySearch:'$searchAccountName'})
       wireRecord({data,error}){
           if(data){           
               this.records = data;
               this.error = undefined;
               this.dataNotFound = '';
               if(this.records == ''){
                   this.dataNotFound = 'There is no Contact found related to Account name';
               }
    
              }else{
                  this.error = error;
                  this.data=undefined;
              }
       }
   

    
    
}