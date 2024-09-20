import { LightningElement ,api} from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Lwc_Practice_Ud extends  NavigationMixin{

@api recordId


//   delectbutton(event){

//     deleteRecord(this.recordId).then(Response=>{ 
//                         this[NavigationMixin.Navigate]({
//                       type: 'standard__objectPage',
//                       attributes: {
//                       objectApiName: 'Account',
//                       actionName: 'home', },
//                       });
//   }).catch(error=>{
//             const evt = new ShowToastEvent({
//             title: this._title,
//             message:'Deleteing the Message ',
//             variant: 'there is unavaliable clipe',
//         });
//         this.dispatchEvent(evt);
//       });
//   }
// }
}