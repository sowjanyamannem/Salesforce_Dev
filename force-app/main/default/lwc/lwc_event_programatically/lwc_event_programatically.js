import { LightningElement } from 'lwc';

export default class Lwc_event_programatically extends LightningElement
 {

    fireme(event){
        this.dispatchEvent(new CustomEvent('pevent',{details:'Hello User',bubbles:true, composed:true}))
    }
 }