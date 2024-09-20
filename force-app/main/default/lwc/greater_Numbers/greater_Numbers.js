import { LightningElement ,track } from 'lwc';

export default class Greater_Numbers extends LightningElement {
    @track num1;
    @track num2;
    @track num3;
    result;

    firstnumber(event){
        this.num1=event.target.value;

    }

    secondnumber(event){
         this.num2=event.target.value;
    }

    thirdnumber(event){
        this.num3=event.target.value;

    }
    calculateme(event){
        const a = parseInt(this.num1);
        const b = parseInt(this.num2);
        const c = parseInt(this.num3);

        if(a>b && a>c)
        {
            alert('the Greater number is :'+a);
        }
        else if(b>a && b>c){
            alert('the Greater number is :'+b);
        }
        else{
            alert('the Greater number is :'+c);
        }
    }

    clearme(event){
        this.num1='';
        this.num2='';
        this.num3='';
    }

}