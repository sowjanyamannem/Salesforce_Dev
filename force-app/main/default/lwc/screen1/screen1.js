import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class Screen1 extends NavigationMixin(LightningElement)
{
    navigatetonext1(event) {
        event.preventDefault();
        let componentDef = {
            componentDef: "c:screen2",
        };
        let encodedComponentDef = btoa(JSON.stringify(componentDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'one/one.app#' + encodedComponentDef
            }
        });
    }
}