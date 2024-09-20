import { LightningElement,track ,wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import getCustomer from '@salesforce/apex/GetCustomerData.getCustomers';

export default class Screen3 extends  NavigationMixin(LightningElement)
 {
    @track customerData;
    @track selectedCustomer;

    @wire(getCustomer)
    Customers({ data, error})
    {
        // this.customerData = [];
        if(data)
        {
            // for(let i=0; i<data.getCustomer.length; i++)
            // {
            //     this.customerData = [{value: data.getCustomer[i].Id , label: data.getCustomer[i].Name}];
            // }
            this.customerData = data;
        }
        else if(error)
        {
            this.customerData = undefined;
        }
    }
    navigatetochild()
    {
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            actionName: "new",
            objectApiName: "payment_gateway_custom__c"
        }
    });
}

 }