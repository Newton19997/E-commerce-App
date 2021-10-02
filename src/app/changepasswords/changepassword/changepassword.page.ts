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
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  prod:any;
  prods:any;

  checkORnot:any;
  call : boolean=false;
  constructor(public api: ApiService, private route: ActivatedRoute,private routes: Router,public toastController: ToastController) { 
    this.prod = new Userchange();
    this.prods = {};
   }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.call= true;
    this.reset();
  }
reset(){
  this.prod.fname='';
  this.prod.mobile='';
  this.prod.password='';
  this.prod.newpassword='';
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
  this.routes.navigateByUrl('/login');
}
ionViewDidLeave()
{
 // console.log("it will leave")
  this.call=false
}

ionViewWillEnter()
{  
  if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    this.usercheck("Please login");
    return;
  }
  try {
 
    this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));
    this.checkORnot.userid=parseInt(localStorage.getItem('uid'));
    this.checkORnot.mobile=localStorage.getItem('use');
    this.checkORnot.password=localStorage.getItem('pas');
   
    this.api.postdata('UserIns/user_Checkornot', this.checkORnot).subscribe((rsq: any) => {
    // console.log(rsq);
    // console.log(rsq.data[0].id)
    if(rsq.data[0].id == 0){
     // this.reset();
      this.usercheck("Please login");
    }
  });
  } catch (error) {
 
} 
if(!this.call)
{ 
  this.reset();
}
 
}

  save() {
    try {
      this.prods.CompanyID=parseInt(localStorage.getItem('com'));
      this.prods.fname=this.prod.fname;
      this.prods.mobile=this.prod.mobile;
      this.prods.password=this.prod.password;
      this.prods.newPassword=this.prod.newpassword;

      this.api.postdata('UserIns/user_passwordUpdate', this.prods).subscribe(async(rsq: any) => {
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
}
