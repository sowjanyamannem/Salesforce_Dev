import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class Event_form extends LightningElement {

    name;
    date;
    capacity;

    calleventname(event){
        this.name=event.target.value;

    }

    callthedate(event){
        this.date=event.target.value;
    }
    callcapacity(event){
        this.capacity=event.target.value;
    }
    savebutton(event){
         //Create Field List....
        const fields={'Name': this.name,'Date__c':this.date, 'maximum_capacity__c':this.capacity };
        console.log('here  is the :',fields);
        //create ApiRecord with field...
        const RecordData = {apiName : 'Event__c', fields}
        createRecord(RecordData).then(response=>{
            alert('Successfully created the Record.'+response.id);
        }).catch(error=>{'error: Failure to create the record '+error.body.message});
    }
}