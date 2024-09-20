
import { LightningElement,wire,api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import allaccountdata from '@salesforce/apex/apexContactsClass.allAccounts';
import allcontactsdata from '@salesforce/apex/apexContactsClass.accountrelatedcontacts';
import allopportunites from '@salesforce/apex/apexContactsClass.accountrelatedcase';



export default class Tablepractice2 extends LightningElement {

    nameofoppo;
    nameList = [];
    newlistids = [];
    selectedIds= [];
    contactsofacc;
    selectedRecord =[];
    accountname;
    searchtext;
    hasrecords = false;
    searchoutput = [];
    searchoutputcontacts = [];
    searchoppor= [];
    selectedRecords= [];
    @api label = "Account";
    @api iconName = "standard:account";
    @wire(allaccountdata,{searchtext:'$searchtext'}) searchdata({data,error}){
        if(data){
            console.log(data);
            this.hasrecords = data.length > 0 ? true : false;
            console.log(this.hasrecords);
            this.searchoutput = data;

        }else if(error){
            console.log(error);
            this.hasrecords= false;
        }
    }

    // @wire(allcontactsdata, {accountname: '$selectedRecord'}) searchcontacts({data,error}){
    //     if(data){
    //         console.log(data);
    //         this.searchoutputcontacts = data;
    //     }else if(error){
    //         console.log(error);
    //     }
    // }
    handleonchange(event){
        let value = event.target.value;
        this.searchtext=value;
        console.log(this.searchtext);
       // this.selectedIds = this.allaccountdata(this.searchtext);
    }
    onchnagename(event){
            this.contactsofacc = event.target.value;
    }

    clickhandle(event){
            console.log('here is the data :');
            //for(let currentitems of this.selectedRecord){

            //}
            let recId = event.target.getAttribute("data-recid");
            this.selectedRecord = this.searchoutput.find((currentitem) => currentitem.Id === recId );

            console.log('here the data 2',recId);
            if(this.validateDuplicates(recId)){
                
            let pill = {
                type: "icon",
                label: this.selectedRecord.Name,
                name: recId,
                iconName: this.iconName,
                alternativeText: this.selectedRecord.Name
            };
            this.selectedRecords = [...this.selectedRecords,pill];
           console.log("here is the records:",this.selectedRecords);
           console.log("here is the stringify data records are:",JSON.stringify(this.selectedRecords));
        //    this.newlistids= this.selectedRecord.Id ;
            }
        }
        handleItemRemove(event) {
            const index = event.detail.index;
            this.selectedRecords.splice(index, 1);
        }
    
    get showpillcontainer(){
      return this.selectedRecords.length > 0? true : false;         
    }

    // handleItemRemove(event) {
    //     // const name = event.detail.item.name;
    //     // alert(name + ' pill was removed!');
    //     const index = event.detail.index;
    //     this.searchRecords.splice(index, 1);
    // }

    validateDuplicates(selectedRecord){
       // console.log("here the data is selected records: ",selectedRecord);
        let isvalid = true;
       let isalreadyRecordselected =  this.selectedRecords.find((currentitem)=> currentitem.name === selectedRecord);
       console.log("here the data is isalreadyRecordselected records: ",this.selectedRecords);
       if(isalreadyRecordselected){

        isvalid= false;
        this.dispatchEvent(new ShowToastEvent({
            title: "Error",
            message: "Pill is already selected ",
            variant: "error",
        })
       );
       }
       else {
        isvalid = true;
       }
       return isvalid;
       
    }

   
    handletheonclickcont(event){
       // let recId1 = event.target.getAttribute("items");

       this.selectedRecords.forEach(acc => {
        console.log("loop values are:", acc.name);
        this.nameList.push(acc.name); // Push each acc.name value into the nameList array
    });
    console.log("here the values are:",JSON.stringify(this.nameList));
 
        console.log('iuynfiucioudoir',this.selectedRecords.Id);
        allcontactsdata({accId :this.nameList} 

        ) .then(result=>{
            console.log('the result in the handler class is :',result);
            this.searchoutputcontacts = result;

            console.log('here the contacts records',this.searchoutputcontacts);
        }).catch(error=>{
            console.log(error);
        });  
    }
    nameListcon = [];
    handletheonclickoppo(event){
        console.log('id--opp--',this.searchoutputcontacts);
        this.searchoutputcontacts.forEach(acc => {
            console.log("loop values are:", acc.Id);
            this.nameListcon.push(acc.Id); // Push each acc.name value into the nameList array
        });
        console.log("here the values are:",JSON.stringify(this.nameListcon));
     

        allopportunites({conId : this.nameListcon}
           
        ).then(result=>{
            this.searchoppor = result;
            console.log('here the opportunity records',this.searchoppor);
        }).catch(error=> {
            console.log(error);
        });
    }
   
    changeoppo(event){
        this.nameofoppo = event.target.value();
    }

    
}