import { LightningElement,track } from 'lwc';
import getChatgptResults from '@salesforce/apex/lwc_chatgpt_integration.getChatgptResults';

export default class Lwc_chatgpt_integration extends LightningElement {

    @track searchTermText= '';
    @track searchChatResult=[];
    showSpinner = false;

    handleEnterchange(event){
        if(event.keyCode === 13){
            this.showSpinner = true;
            this.searchTermText= event.target.value;
            getChatgptResults({searchTerm : this.searchTermText})
            .then(result=>{
                this.showSpinner = false;
                let response = JSON.parse(JSON.stringify(JSON.parse(result)));
                if(response.choices[0].text){
                    this.searchChatResult = response.choices[0].text;


                    this.searchChatResult = this.searchChatResult.replace(/\n/g,"<br />");

                    this.searchChatResult = this.searchChatResult.trim();

                }
                //console.log('-----result--',result);
               // this.searchChatResult = result;
            }).catch(error=>{console.error('----error---',error);})
        }

    }

}