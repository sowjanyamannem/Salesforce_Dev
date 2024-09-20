import { LightningElement , wire, api, track } from 'lwc';

export default class AccountTable extends LightningElement {
    name='Sowjanya';
              
    callme(event){
        this.name='Captial Info Solution';

    }
    listenname(event){
        this.name=event.target.value;
    }
}