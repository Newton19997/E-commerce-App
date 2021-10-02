import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastController } from '@ionic/angular';


import {ModalController} from '@ionic/angular';
import {ModalPage} from '../../modals/modal/modal.page'
export class userlogin {
  mobile: any;
  email: any;
  password: any;
  CompanyID: any;
  }
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  prod: any;
  prods:any;
  companyError=true;
  call : boolean=false;

  login:any;
  constructor(public api: ApiService,private routes: Router,public toastController: ToastController,private modalcController:ModalController) {
    this.prod = new userlogin();
   }

   portChange(event: { component: IonicSelectableComponent,  value: any }) {
    console.log('Company:', event.value);
   // this.prod.CompanyID=event.value.companyid;
  }
   validatecompany(value){
    if(value === "default"){
     this.companyError=true;
    }else{
      this.companyError=false;
    }
  }

  ionViewDidLeave()
  {
   // console.log("it will leave")
    this.call=false;
  }
  ionViewWillEnter(){
    this.prod.CompanyID='';
    this.prod.mobile='';
    this.prod.password='';
  if(!this.call)
  { 
    this.getProductCategorytype();
    this.login=localStorage.getItem('uid');
  }
}
reset(){
  this.prod.CompanyID=null;
  this.prod.mobile=null;
  this.prod.password=null;
  this.getProductCategorytype();
}
  ngOnInit() {
    this.call= true;
    this.getProductCategorytype();
    this.reset();
    this.login=localStorage.getItem('uid');
  }

  getProductCategorytype() {
    this.api.getdata('comp?filter[where][statusID]<>255').subscribe(res => {
      this.prods = res;
     // console.log(res);
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
  // console.log('toast Dismissed !')
   });
   //for massage end
     } 
  async ChackLogin() {

    if(!this.prod.CompanyID){
      this.checkcompany();
      return;
    }
  
    // localStorage.setItem('use',this.prod.uname)
    // localStorage.setItem('pas',this.prod.password)
    // localStorage.setItem('com',this.prod.CompanyID)
    //localStorage.getItem('com')
    //localStorage.removeItem('com')
    this.prod.CompanyID=this.prod.CompanyID.companyid;
    await  this.api.patchdata('UserIns/checkuserlogin', {data:[this.prod]}).subscribe(async (res: any) => {
     // console.log(res.data);

      if(res.data.length > 0)
             { 
              localStorage.setItem('uid',res.data[0].uid);
              localStorage.setItem('umane',res.data[0].fname);
             // localStorage.setItem('use',this.prod.mobile);
              localStorage.setItem('use',res.data[0].mobile);
              localStorage.setItem('pas',this.prod.password);
              localStorage.setItem('com',this.prod.CompanyID);
              localStorage.setItem('eml',this.prod.mobile);

              // this.api.patchdata('UserIns/checkuserloginactiv', {data:[this.prod]}).subscribe(async (res: any) => {
              //   console.log(res.data);});

              const toast = await this.toastController.create({
                message: 'Well Come for Shopping ',
                duration: 2000,
                animated:false, 
                position:'top', 
                color:'warning',
                });  
              toast.present();
              toast.onDidDismiss().then((val)=>{
             // console.log('toast Dismissed !')
              });
               this.routes.navigateByUrl('/home/1');
             }
             else {
              this.reset()
              //for massage
    const toast = await this.toastController.create({
      message: 'Login faild.',
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
               //this.api.showSuccessToast('Login faild');
         
             }

     // this.api.showSuccessToast('Record added into ProfReading process successfully');
    //  await this.getData();
    //   this.selectedCards = [];
    //   this.selectAllCard = null;
    });
    // this.api.getdata('UserInfos/passwordlink?UserInfo='+ this.logins.Password).subscribe( (res: any) => {
    //   this.retrunhashData = res;
    //   console.log(res);
    // });
    // setTimeout(() => {
    //   this.api.getdata('UserInfos?filter[where][username]=' +this.logins.LoginID + '&filter[where][password]='+ this.retrunhashData).subscribe( (res: any) => {
    //     // this.api.getdata('UserInfos?filter[where][username]=' +this.logins.LoginID + '&filter[where][password]='+ this.logins.Password).subscribe( (res: any) => {
    //        this.getData = res;
    //        console.log(res);
    //        if(this.getData.length > 0)
    //        { 
    //          this.routes.navigateByUrl('/dashboard');
    //        }
    //        else {
    //          this.api.showTost(' Login faild');
       
    //        }
          
    //       // this.route.navigate(['/dashboard']);
    //      }, error1 => {
    //        console.log('error1 ', error1);
    //      });
    // }, 1000);
  }

  OpenModal(){
    this.modalcController.create({component:ModalPage}).then((modalElement)=>{
      modalElement.present();
    })
  }
}
