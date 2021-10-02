import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ModalController, ToastController} from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService } from 'src/app/api.service';
export class usermodel {
  mobile: any;
  email: any;
  password: any;
  CompanyID: any;
  }
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  prod: any;
  prods:any;
  companyError=true;
  call : boolean=false;
  comname:any;
  comNO:any;
  coms:any;
  mob:any;
  constructor(public api: ApiService,private routes: Router,public toastController: ToastController,private modalcController:ModalController) {
    this.prod = new usermodel();

   }
  portChange(event: { component: IonicSelectableComponent,  value: any }) {
    console.log('Company:', event.value);
   // this.prod.CompanyID=event.value.companyid;
  //  this.comname=event.value.companyname;
  this.getMobileNO();
  }

  ngOnInit() {
    this.call= true;
    this.getProductCategorytype();
  }
CloseModal(){
  this.modalcController.dismiss();
}


getProductCategorytype() {
  this.api.getdata('comp?filter[where][statusID]<>255').subscribe(res => {
    this.prods = res;
   //console.log(res);
  // this.comNO=this.prods[0].
  }, err => {
    console.log('err', this.prod);
  });
}
getMobileNO() {
  // console.log(this.prod.CompanyID);
   this.api.getdata('comp?filter[where][statusID]<>255&filter[where][companyid]='+this.prod.CompanyID.companyid).subscribe(res => {
     this.coms = res;
    
    this.comNO =this.coms[0].mobileNo;
    console.log( this.comNO);
   }, err => {
     //console.log('err', this.prod);
   });
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
}
 }

 ChackLogin(){
  if(!this.prod.CompanyID){
    this.checkcompany();
    return;
  }
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

}
