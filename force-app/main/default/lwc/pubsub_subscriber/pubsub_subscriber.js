import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub'

export default class Pubsub_subscriber extends LightningElement 
{

    rmessage;
    sdisplay;
    connectedCallback(){
        this.register();
    }

    register()
    {
        pubsub.register('eventofity',this.callme.bind(this));
    }

    callme(messagefromevent)
    {
        //alert('Hi'+messagefromevent);
        this.rmessage = messagefromevent ? JSON.stringify(messagefromevent,null,'\t') : 'No message in Payload' ;
    }   

//     connectedCallback(){
//         this.register();
//     }
    
//    register()
//     {
//         pubsub.unregister('firetheevent',this.callme.bind(this));
//     }
//     callme(messagefromevent1)
//     {
//         alert('it s coming ');
//         this.sdisplay = messagefromevent1 ? JSON.stringify(messagefromevent1,null,'\t') : 'No Message in the Payload';
//     }



}