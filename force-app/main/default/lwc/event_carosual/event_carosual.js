import { LightningElement } from 'lwc';
import Images from '@salesforce/resourceUrl/events';
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';'

export default class Event_carosual extends LightningElement {


    image1 
    image2;
    image3;

    connectedCallback()
    {
        this.image1 = Images+'/logo/band_1.JPG';
        this.image2 = Images+'/logo/veena.JPG';
        this.image3 = Images+'/logo/art.JPG';
    }
}