import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastController } from '@ionic/angular';

export class addlogin {
                      uname: any;
                      password: any;
                      CompanyID: any;
                      }

@Component({
  selector: 'app-adlogin',
  templateUrl: './adlogin.page.html',
  styleUrls: ['./adlogin.page.scss'],
})
export class AdloginPage implements OnInit {
  prod: any;
  prods:any;
  companyError=true;
  // company=['My Company','Second Company'];
  login:any;
  constructor(public api: ApiService,private routes: Router,public toastController: ToastController) {
    this.prod = new addlogin();
   }

   portChange(event: { component: IonicSelectableComponent,  value: any }) {
    console.log('Company:', event.value);
  }
  ngOnInit() {
    this.getProductCategorytype();
    this.login=localStorage.getItem('com');
  }

  
ionViewWillEnter()
{
  this.reset();
  this.login=localStorage.getItem('com');
}
  reset(){
    this.prod.CompanyID='';
    this.prod.uname='';
    this.prod.password='';
    this.getProductCategorytype();
  }

  validatecompany(value){
    if(value === "default"){
     this.companyError=true;
    }else{
      this.companyError=false;
    }
  }

  
  async checkcompany(){
    //for massage
    const toast = await this.toastController.create({
     message: 'please select Company Name.',
     duration: 2000,
     animated:false, 
     position:'middle', 
     color:'warning',
     });  
   toast.present();
   toast.onDidDismiss().then((val)=>{
   console.log('toast Dismissed !')
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

    await  this.api.patchdata('adminlogins/checkadminlogin', {data:[this.prod]}).subscribe(async (res: any) => {
     // console.log(res.data);

      if(res.data.length > 0)
             { 
              localStorage.setItem('use',this.prod.uname);
              localStorage.setItem('pas',this.prod.password);
              localStorage.setItem('com',this.prod.CompanyID.companyid);

              this.prod='';
              
              const toast = await this.toastController.create({
                message: 'Well Come your Company',
                duration: 2000,
                animated:false, 
                position:'middle', 
                color:'warning',
                });  
              toast.present();
              toast.onDidDismiss().then((val)=>{
              console.log('toast Dismissed !')
              });
               this.routes.navigateByUrl('/admin');
             }
             else {
              this.reset()
              const toast = await this.toastController.create({
                message: 'Login faild.',
                duration: 2000,
                animated:false, 
                position:'middle', 
                color:'warning',
                });  
              toast.present();
              toast.onDidDismiss().then((val)=>{
            console.log('toast Dismissed !')
              }); 
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

  getProductCategorytype() {
   // this.api.getdata('comp').subscribe(res => {
    this.api.getdata('comp?filter[where][statusID]<>255&filter[order]=companyid DESC').subscribe((res: any) => {
      this.prods = res;
     // console.log(res);
    }, err => {
      console.log('err', this.prod);
    });
  }

  
  SearchCompany() {    
    let link = `comp/getseachCompany?`;
    if ( this.prod.CompanyID) link += '&compname=' + encodeURIComponent(this.prod.CompanyID);
    this.api.getdata(link).subscribe((res: any) => {
      // this.api.getdata('comp/getseachCompany?compname=' + this.searchcom).subscribe((res: any) => {
      this.prods = res;  
      });
 
    };



}
