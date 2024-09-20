import { LightningElement,api } from 'lwc';

export default class Lightning_LDS_Record_Edit_form extends LightningElement 
{
    @api recordId;

    onclick(event){
        const inputfield = this.template.querySelectorAll('lightning-input-field');
        inputfield.forEach(fields=>{fields.reset();})
    }

}