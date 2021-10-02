import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';

export class Userin {
  uid: any;
  fname:any;
  lname: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  mobile: any;
  email: any;
  password: any;
  CompanyID: any;
  }


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  companyError=true;
  prod:any;
  prods:any;
  response: any;
  master:any;
  today: number;
  check:any;
  company:any;

  login:any;
  constructor(public api: ApiService,private routes: Router,public toastController: ToastController) {
    this.prod = new Userin();
    this.today = Date.now()+6*3600*1000;
    this.master = {StartDate: this.today,statusID:0};
    console.log( this.prod.CompanyID);
   }

   portChange(event: { component: IonicSelectableComponent,  value: any }) {
    console.log('Company:', event.value);
   // this.prod.CompanyID=event.value.companyid;
  }
  ngOnInit() {
    this.getProductCategorytype();
    this.login=localStorage.getItem('uid');
    // console.log("err', this.prod");
    // console.log(this.login);
  }

  ionViewWillEnter()
  {
    this.prod={};
    this.login=localStorage.getItem('uid');
   
  }
  
  validatecompany(value){
    if(value === "default"){
     this.companyError=true;
    }else{
      this.companyError=false;
    }
  }
   //this.api.getdata('ProductCategories?filter[limit]=50&filter[where][CampanyID]=' + localStorage.getItem('com') +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
     
  getProductCategorytype() {
    this.api.getdata('comp?filter[where][statusID]<>255').subscribe(res => {
     
      this.prods = res;
      console.log(res);
    }, err => {
      console.log('err', this.prod);
    });
  }

 async checkcompany(){
 //for massage
 const toast = await this.toastController.create({
  message: 'please select Company Name.',
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
patch(userForm: NgForm) {
 
  if(!this.prod.CompanyID){
    this.checkcompany();
    return;
  }


 // console.log( this.prod.CompanyID);
  this.prod.StartDate=this.master.StartDate, this.prod.statusID=this.master.statusID;
  this.prod.CompanyID=this.prod.CompanyID.companyid;
  console.log(this.prod);

  this.api.getdata('UserIns/CheckRegistation?ComID='+this.prod.CompanyID+ '&mobileno=' + this.prod.mobile).subscribe(async(res1: any) => {
   this.check=res1;
   if(res1[0].CheckExists==1)
   {
        //for massage
        const toast = await this.toastController.create({
          message: 'you are already registered.',
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
else{
  this.api.patchdata('UserIns', this.prod).subscribe(async(res: any) => {
    this.response = res;   
   // console.log(res);
    userForm.resetForm();
   // this.added.emit(true);
   
        //for massage
        const toast = await this.toastController.create({
          message: 'you have registered successfully.',
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
  }, err => {
     //for massage
    //  const toast = await this.toastController.create({
    //   message: 'you have registered successfully.',
    //   duration: 2000,
    //   animated:false, 
    //   position:'top', 
    //   color:'warning',
    //   });  
    // toast.present();
    // toast.onDidDismiss().then((val)=>{
    // console.log('toast Dismissed !')
    // });
    console.log(err);
  });
}

});

}

}
