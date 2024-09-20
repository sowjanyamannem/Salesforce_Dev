import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountCountroller.getAccounts';
import findbycontact from '@salesforce/apex/contactscontroller.findbycontact';

export default class Treegrid_accountswithrelated extends LightningElement {




    // definition of columns for the tree grid
    gridColumns = getAccounts;

    // data provided to the tree grid
    gridData = findbycontact;
}