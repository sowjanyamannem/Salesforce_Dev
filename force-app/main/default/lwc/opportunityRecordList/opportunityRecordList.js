import { LightningElement,api,wire } from 'lwc';
import getopportunity1 from '@salesforce/apex/opportunitycountroller.getopportunity';

export default class OpportunityRecordList extends LightningElement {
    columns = [{ label:'Name', fieldName : 'Name'}];
    @api accountId;
    @wire (getopportunity1,{accountId:'$accountId' }) opportunitys;

}