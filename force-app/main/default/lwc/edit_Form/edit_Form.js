import { LightningElement ,api} from 'lwc';

export default class Edit_Form extends LightningElement {
    @api recordId;

    cancleme(event){
        const inputfield = this.template.querySelectorAll('lightning-input-field');
        inputfield.forEach(field => {field.reset(); });
    }
     
}