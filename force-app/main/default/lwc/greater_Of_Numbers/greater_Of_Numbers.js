import { LightningElement } from 'lwc';

export default class Greater_Of_Numbers extends LightningElement {
    num1;
    num2;
    num3;
    result;
     
    firstnumber(event){
        this.num1=event.target.value;
    }

    secondnumber(event){
          this.num2=event.target.value;
    }

    thirdnumber(event){
         this.num3 = event.target.value;
    }

    calculateme(event){
        const a=parseInt(this.num1);
        const b=parseInt(this.num2);
        const c=parseInt(this.num3);
         if( a>b && a<c){
             alert('The Greater Number Is :'+a);
         }
         else if(b>a && b>c){
             alert('The Greater Number Is :'+b);
         }
         else{
             alert('The Greater number is :'+c);
         }

    }

    Clearme(event){
        this.num1=null;
        this.num2=null;
        this.num3=null;

    }
}