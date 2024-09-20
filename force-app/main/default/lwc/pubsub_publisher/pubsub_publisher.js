import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub'
export default class Pubsub_publisher extends LightningElement 
{

    pubme(event){

        let message = {
                     "message":"Hi Guys this is Pubsub & also know as Singleton",
                     "name":"Sowji",
                     "Phone":"888888"
                     };
        pubsub.fire("eventofity",message);
    }

    // clickme(event){
    //     let message1 = {
    //                       'message' : 'Hello  Dear U are created these by using Pubsub ',
    //                       'name' : 'Hello  message',
    //                       'Phone' : '99999'
    //                   };
    //     pubsub.fire("firetheevent",message1);
    // }
}