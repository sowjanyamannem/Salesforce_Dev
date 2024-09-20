import { LightningElement,api} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import NAME_PJHONE from '@salesforce/schema/Account.Phone';
import NAME_FAAX from '@salesforce/schema/Account.Fax';

export default class Full_Record_Form extends LightningElement {
    @api recordId;
    objectnum=  ACCOUNT_OBJECT;
    myfields=[NAME_FIELD, NAME_PJHONE, NAME_FAAX ];

     
}