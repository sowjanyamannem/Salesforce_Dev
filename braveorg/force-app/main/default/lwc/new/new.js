import { LightningElement,track } from 'lwc';

export default class New extends LightningElement 
{
    @track num1;
    @track num2;
    @track num3;
  
 
    firstnum(event){
        this.num1= event.target.value;
    }
    secnum(event){
        this.num2= event.target.value;
    }
    thirdnum(event){
        this.num3= event.target.value;
    }
    calculateme(event){
        const a=parseInt(this.num1);
        const b=parseInt(this.num2);
        const c=parseInt(this.num3);
        if(a>b && a<c){
            alert('the greater number is: '+a);
        }
        else if(b>a && b<c){
            alert('the greater number is: '+b);
        }
        else{
            alert('the greater number is: '+c);
        }
        
    }
    clearme(event){
        this.num1= null;
        this.num2= null;
        this.num3= null;
        
    }
}