import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-forpayment',
  templateUrl: './forpayment.page.html',
  styleUrls: ['./forpayment.page.scss'],
})
export class ForpaymentPage implements OnInit {
  prods:any;
  partialpayment:any;
  page = 1;
  pageSize =15;
  items = [];
  pid:any;

  vname:any;
  vtype:any;
  vamount:any;
  vpayamount:any;
   adjustment:any;
   pay:any;
   partial:any;

   call : boolean=false;
   checkORnot:any;
  constructor(public api: ApiService,private route: ActivatedRoute ,private routes: Router,public toastController: ToastController) {
    this.adjustment = {};
        //for edit
this.route.params.subscribe( param => {
  if (param.id) {
    this.pid=param.id;
    this.loadfor_payment(param.id);
  }
});

this.checkORnot={};
   }

  ngOnInit() {
   //  console.log('sdfs'+localStorage.getItem('com'));
   if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }
   this.call= true;
  }

  loadfor_payment(id){
    this.items=[];
    this.api.getdata('Viewpayments/for_payment?comid=' + localStorage.getItem('com') +'&pid='+ id).subscribe((res: any) => {
      this.prods = res;
      if(this.prods )
      { this.vname=this.prods[0].username;
        this.vtype=this.prods[0].type;
        this.vamount=this.prods[0].amount;
        this.vpayamount=this.prods[0].payAmount;
      }
     
      console.log(res); 
      for (var i = 0; i < this.prods.length; i++)
      { 
     this.items.push(this.prods[i]);    }    
    }, err => {
      console.log('err', this.prods);
    });
  }

  reset(){
    this.adjustment = {};
    this.items=[];
    this.vname='';
      this.vtype='';
      this.vamount='';
      this.vpayamount='';
      this.routes.navigate(['/viewpayment'])
      // this.routes.navigateByUrl('/viewpayment');
     // https://stackoverflow.com/questions/45025334/how-to-use-router-navigatebyurl-and-router-navigate-in-angular


  }

  async warning(massage: any){
    const toast = await this.toastController.create({
      message: massage,
      duration: 2000,
      animated:false, 
      position:'middle', 
      color:'warning',
      });  
    toast.present();
    toast.onDidDismiss().then((val)=>{
    console.log('toast Dismissed !')
    });
    // this.routes.navigateByUrl('/login');
  }
  chackQty(e,){
    // if(e==0) {
    //   this.warning("PayAmount won't be Zero");    
    //  // this.loadfor_payment(this.pid)
    // }

    if(this.prods[0].payAmount<e)
    { 
      this.warning('PayAmount will be Equal Given Amount');
      this.loadfor_payment(this.pid)
    }
  }

  Full_payment(){
            if(this.vpayamount==0 || this.vpayamount=='' ){
              this.warning("PayAmount won't be Zero or blank");
              return;
            }

    try {
      this.adjustment = {};
      this.adjustment.CompanyID = parseInt(localStorage.getItem('com'));
      this.adjustment.pid =  parseInt(this.pid);
      this.adjustment.payAmount = parseFloat(this.vpayamount);
    
      this.api.postdata('Viewpayments/Full_payment', this.adjustment).subscribe((rse: any) => {
        this.pay = rse;
       // console.log(this.pay); 
if(rse){
 this.reset();
}
      });
    } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    }

  }

  loadfor_partialpayment(){
    if(this.vpayamount==0 || this.vpayamount==''){
      this.warning("PayAmount won't be Zero or blank");
      return;
    }
    try {
      this.adjustment = {};
      this.adjustment.pCompanyID = parseInt(localStorage.getItem('com'));
      this.adjustment.ppid = parseInt(this.pid);
      this.adjustment.ppayAmount = parseFloat(this.vpayamount);
    
      this.api.postdata('Viewpayments/partial_payment', this.adjustment).subscribe((rse: any) => {
        this.partial = rse;
        //console.log(this.partial); 
        if(rse){
          this.reset();
         }
      });
    } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    }

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
