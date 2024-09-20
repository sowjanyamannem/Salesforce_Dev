import { LightningElement } from 'lwc';

export default class Lwc1_event_Programatically extends LightningElement 
{  

    constructor()
    {
        super();
        this.template.addEventListener('pevent',this.handleme);
    }

    handleme(event){
        alert(event.detail);
    }
}