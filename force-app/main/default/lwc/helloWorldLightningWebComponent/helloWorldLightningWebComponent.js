import { LightningElement } from 'lwc';

export default class HelloWorldLightningWebComponent extends LightningElement {
    greeting = 'World'
    changeHandler(event){
        this.greeting = event.target.value;
    }
}