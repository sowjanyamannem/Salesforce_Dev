import { LightningElement,api,wire } from 'lwc';
import new_class_methods from '@salesforce/apex/new_map.new_class_method';

const columns = [
    { label: 'Account Name', fieldName: 'Name', type: 'Name' },
    { label: ' Phone', fieldName: 'Phone' , type:'Phone'},
    { label: 'Fax', fieldName:'Fax', type:'Fax'}
    // Add columns for custom objects similarly
];
 
export default class Data_table_multiple_objects extends LightningElement {
    accounts = [];
    conatcts = [];
    opList = [];
    //  data =[];
   // @api recordId;   
    columns = columns;
   

    @wire(new_class_methods)
    wiredData({ error, data }) {
        
        if (data) {
            console.log(data);
           // const jsonString = JSON.stringify(data);
           // console.log('jsgfuiutiruetihsn---',jsonString);
           console.log(data);
            this.accounts = data.accRecord; // Assign value to accRecord
            this.contacts = data;
            console.log('iuyiefyiuf',this.accounts);
            this.accounts.forEach(item =>{
                     console.log(item.Name);
                     console.log(item.Phone);
                     console.log(item.Fax);
                    // console.log(item.contacts.LastName);
                     if (item.Contacts) {
                     item.Contacts.forEach(ele =>{  
                        console.log('the contact lastname is :',ele.LastName);
                        console.log('the contact phone is :',ele.Phone);
                        console.log(ele.Email);
                     
                     })
                    }
                    if(item.opportunitys){
                        item.opportunitys.forEach(elements=> {
                            console.log('the opportunitys lastname is :',elements.Name);
                            //console.log('the contact phone is :',ele.Phone);
                           // console.log(ele.Email);
                        })
                    }
                    // console.log('the contact information is here :',ele.Name);

                 })

                 console.log(this.accounts);
            // this.accounts.forEach((element) => {
            //     var jsonString = JSON.stringify(element);
            //     console.log('jsgfhsn---',jsonString);
            //     // this.accounts.Id = element.Id,
            //     // this.accounts.Name = element.Name,
            //     // this.accounts.Phone = element.Phone
            //     let dataline = {};
            //     dataline.Id = element.Id;
            //     dataline.Name = element.Name;
            //     dataline.Phone = element.Phone;
            //     dataline.Fax = element.Fax;
               
            //     this.opList.push(dataline);

                // if(!data.this.opList){
                //     this.accounts.forEach((elements) => {

                //     })
                // }
                
            //     console.log('ugomutogiutogitugmoigut',this.opList);

               
            // })

            // const jsonString = JSON.stringify(opList);
            // this.accounts = this.opList;
            // console.log('nkfkwfj',this.accounts);
            // const jsonString = JSON.stringify(data);
            // console.log('jsgfuiutiruetihsn---',jsonString);
            // console.log('ueriweyfhniwfu',data);
        } else if (error) {
            console.error('Error fetching data: ', error);
        }
    }   



}