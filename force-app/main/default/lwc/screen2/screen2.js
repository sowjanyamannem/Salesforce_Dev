import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Pament_Gatewa__c from '@salesforce/schema/Pament_Gatewa__c';
import Type_Mode from '@salesforce/schema/Pament_Gatewa__c.Test__c';

import { NavigationMixin } from 'lightning/navigation';

export default class Screen2 extends NavigationMixin(LightningElement)

{

    @track selectedValue;
    @track options = [];

    // object info using wire service
    @wire(getObjectInfo, { objectApiName: Pament_Gatewa__c })
    objectInfo;

    // Getting Account Type Picklist values using wire service
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Type_Mode })
    typePicklistValues({ error, data }) {
        if (data) {
            let optionsValues = [];
            for (let i = 0; i < data.values.length; i++) {
                optionsValues.push({
                    label: data.values[i].label,
                    value: data.values[i].value
                })
            }
            this.options = optionsValues;
            window.console.log('optionsValues ===> ' + JSON.stringify(optionsValues));
        }
        else if (error) {
            window.console.log('error ===> ' + JSON.stringify(error));
        }
    }



    get options() {
        return [
            { label: 'Test Stripe -', value: 'option1' },

        ];
    }

    value = '';
    navigatetonext2(event) {
        event.preventDefault();
        let componentDef = {
            componentDef: "c:screen3",
        };
        let encodedComponentDef = btoa(JSON.stringify(componentDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'one/one.app#' + encodedComponentDef
            }
        });
    }


    // handle the selected value
    handleChange(event) {
        this.selectedValue = event.detail.value;
    }


}