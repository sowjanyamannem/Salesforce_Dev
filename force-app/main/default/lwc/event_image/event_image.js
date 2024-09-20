import { LightningElement } from 'lwc';
// import styles from './event_image.css'; // Import your CSS file
import {NavigationMixin} from "lightning/navigation";
import backgroundUrl from '@salesforce/resourceUrl/image';

export default class Event_image extends LightningElement {


    // backgroundStyle = `background-image: url('/resource/image/image.jpeg'); background-position: center;`;

    get backgroundStyle() {
         return `height:50rem;background-image:url(${backgroundUrl})`;
        //return   backgroundStyle = `background-image: url('/resource/image/image.jpeg'); background-position: center;`;

    }
    handlerclick(event){
     // Use the basePath from the Summer '20 module to construct the URL
     this[NavigationMixin.Navigate]({
        type: 'standard__namedPage',
        attributes: {
            // pageName: 'event_pages1__c'
            url : 'https://raagvitech-1c6-dev-ed.develop.my.site.com/s/event-pages1',
        }
    });
}

}