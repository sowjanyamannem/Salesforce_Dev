import { LightningElement } from 'lwc';
import getweather from '@salesforce/apex/WeatherAPI.getweather';

export default class WeatherAPI extends LightningElement {
    city;
    condition;
    imageURL;
    
    handleonchange(event) {
        this.city = event.target.value;
     }
    buttonClick() { 
        getweather({ city: this.city }).then((response) => {
            console.log("###Response : " + response);
            let parsedData = JSON.parse(response);
            this.imageURL = parsedData.current.condition.icon;
            this.condition = parsedData.current.condition.text;
        })
            .catch((error) => {
                this.condition = 'No matching location found.';
                console.log('###Error : ' + JSON.stringify(error));
            });
    }
}