import { LightningElement,track,wire } from 'lwc';
import getListingList from '@salesforce/apex/SearchingLocation11.getListingList';
export default class SearchingLocation extends LightningElement 
{
   
   Searchvalue='';
   @track totalListing =[];
  // dataoflist;
  // listofobj;
  
  //it contains all the records
  //totalListing;//the data stored to display the records
  @track totaloflist=0;//
  @track page=1;//were insilizing the page
  @track startingRecord=1;//starting record number per page
  @track endingRecord=0;//ending record number per page
  @track pageSize=5;//defalutly assing the value page size to display is 5.
  @track totalRecountCount=0;//total record count recevied from all the retrieved records
  @track totalPage=0;//total pages that need to display the records
//    @track img= '/sfc/servlet.shepherd/version/download/0685j000006IL3LAAW'
   visibleListing;
//    connectedCallback(getListingList){
     
//        if(data){  
//            this.totalListing = data
//            console.log(this.totalListing)
//        }
//        else if(error){
//            console.error(error)
//        }
    
//   } 



    handlestateName(event) {
       if(event.target.name == 'search'){
           this.search=event.target.value;
           console.log('objName'+this.Searchvalue);
       }
    }
    handleSearch() {
           
            getListingList({Searchkey : this.Searchvalue})
    .then(result=>{  
        console.log(JSON.stringify(result));
        var dataoflist=result.listlis;
        var listofobj=result.recsIdWithConId;           
        for( let inlist in dataoflist){
        for(let key in listofobj){
            if(dataoflist[inlist].Id==key){
            this.totalListing.push({
                Id : dataoflist[inlist].Id,
                Duration : dataoflist[inlist].Duration__c,
                Category : dataoflist[inlist].Category__c,
                State    : dataoflist[inlist].State2__c,
                Country :  dataoflist[inlist].Country__c,
                url : listofobj[key],
            })
            this.totalRecountCount=this.totalListing.length;//the no of records count.
  this.totalPage=Math.ceil(this.totalRecountCount/this.pageSize);//were the calculations done and gives how many pages to display.
  this.totalListing=this.totalListing.slice(0,this.pageSize);//here if the slice is having the 5 pages it will display from the 0 to 4 

            }   
        }
         
    }
    // console.log(JSON.stringify(result));
     
}); 
console.log('records==> : ' +JSON.stringify(this.totalListing)); 


}

previousHandler(){
    if(this.page>1){
        this.page=this.page-1; //decreaseing the page by one 
        this.displayRecordPerPage(this.page);
    }
}
nextHandler(){
    if((this.page<this.totalPage) && this.page !== this.totalPage){
        this.page=this.page+1; //increased the  page by one
        this.displayRecordPerPage(this.page);

    }

}
displayRecordPerPage(page){

    this.startingRecord = ((page -1) * this.pageSize) ;
    this.endingRecord = (this.pageSize * page);

    this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                        ? this.totalRecountCount : this.endingRecord; 

    this.data = this.items.slice(this.startingRecord, this.endingRecord);
    this.startingRecord = this.startingRecord + 1;
}

}