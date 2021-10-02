import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addqtydetail',
  templateUrl: './addqtydetail.page.html',
  styleUrls: ['./addqtydetail.page.scss'],
})
export class AddqtydetailPage implements OnInit {
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
  constructor(public api: ApiService ,private routes: Router,public toastController: ToastController) { 
    this.checkORnot={};
  }

  
  async massagefor(mas: any){
    //for massage
const toast = await this.toastController.create({
message: mas,
duration: 2000,
animated:false, 
position:'top', 
color:'warning',
});  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});      

//for massage end
}

  ionViewWillEnter()
  { 

    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
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

    if(!this.call)
     { 
      console.log("ionViewWillEnterdd")
       this.items=[];
       setTimeout(() => {
        this.loadItempro();
       }, 1000);
     
     }
  }

  ionViewDidLeave()
  {    console.log("it will leavedddd")
    this.items=[];
    this.call=false
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
  
  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.items=[];
    console.log("it ngOn dd")
    this.call= true
    this. loadItempro();
    //this.SearchItem();
  }

  loadItem(){
    // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
       this.api.getdata('ItemMasters?filter[limit]=50&filter[where][CompanyID]='+localStorage.getItem('com') +'&filter[where][statusID]<>255'+'&filter[where][squantity][gt]=0'+'&filter[where][squantity]<>null'+'&filter[order]=iid DESC').subscribe((res: any) => {
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

    
    loadItempro() { 
      this.items=[];
      //this.seachCompany=[];
      let link = `ItemMasters/loadgetseachItemforADD?`;    
      // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
      if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
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
      let link = `ItemMasters/getseachItemforADD?`;    
      if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
      if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
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
        this.loadItempro();
        this.searchcom='';
        this.routes.navigateByUrl('/addqtydetail');
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
}
