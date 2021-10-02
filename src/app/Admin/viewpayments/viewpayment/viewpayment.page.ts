import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-viewpayment',
  templateUrl: './viewpayment.page.html',
  styleUrls: ['./viewpayment.page.scss'],
})
export class ViewpaymentPage implements OnInit {
  prods:any;
  partialpayment:any;
  page = 1;
  pageSize =15;
  items = [];
  searchprods:any;
  searchUser:any;
  call : boolean=false;
  checkORnot:any;
  constructor(public api: ApiService, public route: ActivatedRoute,public routes: Router,public toastController: ToastController) {
    console.log('check');
    this.isreset();
    this.checkORnot={};
   }

  ngOnInit() {
    //  console.log('sdfs'+localStorage.getItem('com'));
   if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }
   this.call= true;
    this.isreset();

  }

  clear(){
    this.items=[];
    this.searchUser='';
  }
  reset(){
    console.log('newton');
    this.items=[];
    this.searchUser='';

  }

  isreset(){
    console.log('newton');
    this.items=[];
    this.searchUser='';

  }

  // let link = `ProductCategories/getseachitemname?`;
  // if ( this.searchcom) link += '&itemname=' + encodeURIComponent(this.searchcom);
  // //pflDesign if (this.fromDate) { link += '&fromdate=' + this.fromDate.toJSON(); }
  // //   if (this.toDate) { link += '&todate=' + this.toDate.toJSON(); }
  //   if (localStorage.getItem('com')) { link += '&comid=' + localStorage.getItem('com'); }
  // this.api.getdata(link).subscribe((res: any) => {
  //   // this.api.getdata('comp/getseachCompany?compname=' + this.searchcom).subscribe((res: any) => {
  //   this.seachCompany = res;


  SearchUserNane(){
    this.items=[];
    let link = `Viewpayments/loaddata_for_paymentSearch?`;
  //  this.api.getdata('Viewpayments/loaddata_for_paymentSearch?comid=' + localStorage.getItem('com')+'&').subscribe((res: any) => {
    if ( this.searchUser) link += '&searchUser=' + encodeURIComponent(this.searchUser);   
      if (localStorage.getItem('com')) { link += '&comid=' + localStorage.getItem('com'); }
    this.api.getdata(link).subscribe((res: any) => {
    
      this.searchprods = res;
      console.log(res); 
      for (var i = 0; i < this.searchprods.length; i++)
      { 
     this.items.push(this.searchprods[i]);
     }    
    }, err => {
      console.log('err', this.searchprods);
    });
  }

  loadfor_payment(){
    this.items=[];
    this.api.getdata('Viewpayments/loaddata_for_payment?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.prods = res;
      console.log(res); 
      for (var i = 0; i < this.prods.length; i++)
      { 
     this.items.push(this.prods[i]);
     }    
    }, err => {
      console.log('err', this.prods);
    });
  }

  loadfor_partialpayment(){
    this.items=[];
    this.api.getdata('Viewpayments/loaddata_for_partialpayment?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.partialpayment = res;
      console.log(res); 
      for (var i = 0; i < this.partialpayment.length; i++)
      { 
     this.items.push(this.partialpayment[i]);
     }    
    }, err => {
      console.log('err', this.partialpayment);
    });
  }

  
  ionViewDidLeave()
  {
    this.call= false;
  }

  
ionViewWillEnter()
{
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
