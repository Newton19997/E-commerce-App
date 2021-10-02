import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
export class Userchange {
  CompanyID: any;
  fname:any;  
  mobile: any;
  email: any;
  password: any;
  newpassword: any;

  }
@Component({
  selector: 'app-adchangepassword',
  templateUrl: './adchangepassword.page.html',
  styleUrls: ['./adchangepassword.page.scss'],
})
export class AdchangepasswordPage implements OnInit {
  prod:any;
  prods:any;
  call : boolean=false;
  checkORnot:any;
  constructor(public api: ApiService, private route: ActivatedRoute,private routes: Router,public toastController: ToastController) { 
    this.prod = new Userchange();
    this.prods = {};
    this.checkORnot={};
   }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.reset();
  }
reset(){
  //console.log("rest")
  this.prod.fname=null;
  this.prod.mobile=null;
  this.prod.password=null;
  this.prod.newpassword=null;
}
// ionViewWillEnter()
// {
//   this.reset();
// }

  save() {
    try {
      this.prods.CompanyID=parseInt(localStorage.getItem('com'));
      this.prods.fname=this.prod.fname;
      this.prods.mobile=this.prod.mobile;
      this.prods.password=this.prod.password;
      this.prods.newPassword=this.prod.newpassword;

      this.api.postdata('adminlogins/admin_passwordUpdate', this.prods).subscribe(async(rsq: any) => {
      console.log(rsq);
      console.log(rsq.data[0].id)
      if(rsq.data[0].id == 1){
        this.reset();
        this.api.Resetpassword(); 
        //for massage
const toast = await this.toastController.create({
  message: 'Your password have been Changed.',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
//console.log('toast Dismissed !')
setTimeout(() => {
  this.usercheck("Please login");
}, 300);
});
//for massage end

      }
      else{
        this.reset();
        //for massage
const toast = await this.toastController.create({
  message: 'Your password has been not Changed.',
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
if(!this.call)
{
this.reset();
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
