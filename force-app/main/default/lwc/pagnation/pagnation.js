import { LightningElement,api } from 'lwc';

export default class Pagnation extends LightningElement 
{
    
    previousHandler(){
        this.dispatchEvent(new CustomEvent('previous'));
    }
   
    nextHandler(){
        this.dispatchEvent(new CustomEvent('next'))
    }
    
}