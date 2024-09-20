import { LightningElement } from 'lwc';
// import LightningConfirm from "lightning/confirm";

export default class Taskhtml extends LightningElement {







    validateInput(){
    // let isValid = true;
    //     let inputFields = this.template.querySelectorAll('.form-control');
    //     console.log("here the data",inputFields[0].value);
    //     inputFields.forEach(inputField => {
    //         if(!inputField.value) {
    //             //console.log("here the data",inputField);
    //             inputField.reportValidity();
    //             //console.log("here the data",inputField);
    //             isValid = false;
    //         }
    //     });
        
         
    //         const result = await LightningConfirm.open({
    //           message: "Please Fill All the Fields",
    //           variant: "headerless",
    //           label: "Label",
    //         });
         // let inputFields = this.template.querySelector(".form-control");
        //    let searchvalue = inputFields.value;
        //   console.log('emptytuyty-- ',inputFields[0].value);
        //   console.log('emptytuyty11-- ',inputFields[1].value);
        //   inputFields.forEach(inputField =>{
        //     console.log('empty',inputField);
        //     if(!inputField.value){
        //         console.log(inputField);
        //         inputField.setCustomValidity("Date value is required");
        //         console.log('empty');
        //     }
            
            //else {
            //     inputField.setCustomValidity(""); // clear previous value
            // }
        //     inputField.reportValidity();
        //   });
    
        //   const result = await LightningConfirm.open({
        //               message: "Please Fill All the Fields",
        //               variant: "headerless",
        //               label: "Label",
        //             });



        let search1cmp = this.template.querySelector(".firstnamecmp");
        let search2cmp = this.template.querySelector(".emailcmp");
        let search3cmp = this.template.querySelector(".companycmp");
        let searchvalue1 = search1cmp.value;
        let searchvalue2 = search2cmp.value;
        let searchvalue3 = search3cmp.value;
        if (!searchvalue1) {
            search1cmp.setCustomValidity("Name value is required");
        }else {
            search1cmp.setCustomValidity(""); // clear previous value
        }
        
        search1cmp.reportValidity();

        if (!searchvalue2) {
            search2cmp.setCustomValidity("Name value is required");
        }else {
            search2cmp.setCustomValidity(""); // clear previous value
        }
        search2cmp.reportValidity();

        if (!searchvalue3) {
            search3cmp.setCustomValidity("Name value is required");
        }else {
            search3cmp.setCustomValidity(""); // clear previous value
        }
        search3cmp.reportValidity();



    }

}