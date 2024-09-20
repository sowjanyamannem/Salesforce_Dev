import { LightningElement,api } from 'lwc';

export default class Lwc_uploadfile extends LightningElement 
{
    @api recordId;
    files=[];
    fileData

    handlefile(event){
        const file = event.target.files[0];
        var reander = new FileReader()
        reander.onload =()=>{
            var base64 = reader.result.split(',')[1]
            this.fileData = { 
                'filename': file.name,
                'base64' : base64,
                'recordId':this.recordId
            }
             console.log(this.fileData)
        }
        reander.readAsDataURL(file)
    }
}