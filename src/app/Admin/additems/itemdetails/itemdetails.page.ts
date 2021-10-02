import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.page.html',
  styleUrls: ['./itemdetails.page.scss'],
})
export class ItemdetailsPage implements OnInit {
  AllItems:any;
  page = 1;
  pageSize =15;
  items = [];
  searchcom:any;
  CompanyId:any;
  seachitem:any;
  @Output() added = new EventEmitter();

  call : boolean=false;
  checkORnot:any;
  constructor(public api: ApiService ,private routes: Router,public toastController: ToastController) { this.checkORnot={}; }

  ngOnInit() {
    //this.SearchItem();
    this.call= true;
   this.LOADSearchItem();
  }

  loadItem(){
    // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
       this.api.getdata('ItemMasters?filter[limit]=50&filter[where][CompanyID]=' + localStorage.getItem('com')+'&filter[where][statusID]<>255'+'&filter[where][squantity]=0'+'&filter[where][isnull(squantity,0)]=0'+'&filter[order]=iid DESC').subscribe((res: any) => {
         this.AllItems = res;
        // this.meta = res.meta;
         console.log(res);
           //  for pagination start
           this.AllItems.forEach(item => {      
            this.items.push(item);         
          });
         //  for pagination end      
      
    
        }, error1 => {
          console.log('Class: , Line:  error1 ', error1);
      });
    }
    
    LOADSearchItem() { 
      this.items=[];
      //this.seachCompany=[];
      let link = `ItemMasters/loadgetseachItemfor?`;    
      //if (this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
      if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
      console.log(link);
      this.api.getdata(link).subscribe((res: any) => {
        // this.api.getdata('comp/getseachCompany?compname=' + this.searchcom).subscribe((res: any) => {
        this.seachitem = res;
    
        // console.log(' ser m'+JSON.stringify(res));
        // console.log(' ser'+ this.seachCompany);
        //this.seachCompany = JSON.stringify(res);
        // console.log(' ser'+ this.seachCompany);
         //  for pagination start
        //  this.seachCompany.forEach(COM=> {      
        //    this.items.push(COM); 
        // }); 
    
        for (var i = 0; i < this.seachitem.length; i++)
           { 
          this.items.push(this.seachitem[i]);
          }
    
        });
       //  for pagination end
      // console.log( 'itema'+ this.items);
      };
    SearchItem() { 
      this.items=[];
      //this.seachCompany=[];
      let link = `ItemMasters/getseachItem?`;    
      if (this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
      if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
      console.log(link);
      this.api.getdata(link).subscribe((res: any) => {
        // this.api.getdata('comp/getseachCompany?compname=' + this.searchcom).subscribe((res: any) => {
        this.seachitem = res;
    
        // console.log(' ser m'+JSON.stringify(res));
        // console.log(' ser'+ this.seachCompany);
        //this.seachCompany = JSON.stringify(res);
        // console.log(' ser'+ this.seachCompany);
         //  for pagination start
        //  this.seachCompany.forEach(COM=> {      
        //    this.items.push(COM); 
        // }); 
    
        for (var i = 0; i < this.seachitem.length; i++)
           { 
          this.items.push(this.seachitem[i]);
          }
    
        });
       //  for pagination end
      // console.log( 'itema'+ this.items);
      };

      ResetItem() {
        this.items=[];
        this.LOADSearchItem();
        this.searchcom='';
        this.routes.navigateByUrl('/itemdetails');
        this.added.emit(true);
       
          // this.fileToUpload=File =null;
          // this.get(); 
          // this.loadImageSerial();    
          // this.collapse = false;         
          // this.prod.Cimage='';
          // this.editId='';
      
        // }, err => {
        //  // this.api.showFailureToast('Error', err.message);
        //   console.log(err);
        // });
       
       
      }


      // searchRecord() {
      //   let link = `ProductionDesigns/searchData?`;
      //   if (this.pflDesign.prodesignorderid) { link += 'workorderno=' + encodeURIComponent(this.pflDesign.prodesignorderid); }
      //   if (this.fromDate) { link += '&fromdate=' + this.fromDate.toJSON(); }
      //   if (this.toDate) { link += '&todate=' + this.toDate.toJSON(); }
      //   if (this.editId) { link += '&productcategoryid=' + this.editId; }
      //   this.api.getdata(link).subscribe((res: any) => {
      //     this.jobCardReport = res;
      //     this.meta.totalItemCount = this.jobCardReport.length;
      //     this.dataList = this.jobCardReport.slice(0, this.meta.itemsPerPage);
      //   });
      // }


      
ionViewDidLeave()
{
  this.call= false;
}


ionViewWillEnter()
{
  if(!this.call)
       {
       this.LOADSearchItem();
      }

if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
  return;
}
// console.log("rsq");
try {
 
  this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));   
  this.checkORnot.uname=localStorage.getItem('use');
  this.checkORnot.password=localStorage.getItem('pas');
 
  this.api.postdata('UserIns/check_companyadmin', this.checkORnot).subscribe((rsq: any) => {
   // console.log("rsrtyrq");
   // console.log(rsq);
  // console.log(rsq.data[0].id)
  if(rsq.data[0].id == 0){
   // this.reset();
    this.usercheck("Please login");
  }
});
} catch (error) {
// this.api.showWarningToast('insert failed..' + error);
} 

}
async usercheck(massage: any){
//for massage
const toast = await this.toastController.create({
  message: massage,
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
// console.log('toast Dismissed !')
});
//for massage end
this.routes.navigateByUrl('/adlogin');
}
}
