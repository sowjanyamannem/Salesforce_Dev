public class DisplayPDFController {
    
    public String recordId{ get; set;}
    public DisplayPDFController(){
	recordId= System.currentPageReference().getParameters().get('Id');
        system.debug('recordId===>'+recordId);
    }

}