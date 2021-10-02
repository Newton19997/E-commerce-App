import { Component } from '@angular/core';
import { ApiService } from '../api.service';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';


export class searchome {
  product: any;
  catagory:any;
  CompanyID: any;
  }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myObje:any;
  prod:any;
  selectedcatagorys: any;
  Id:any;
  checkORnot:any;
  call : boolean=false;
  ui:any;
  use:any;
  total:any;

  // slidersopt={
  //   zoom:{
  //     maxRatio:5
  //   }
  // };

  clopase=true;
  subscribe:any;
  Version:any;
  constructor(public api: ApiService, public route: ActivatedRoute,public routes: Router,public toastController: ToastController,public platform:Platform,public alertController: AlertController,private iab:InAppBrowser,) {
    this.prod = new searchome();

    this.route.params.subscribe(params => {
      if (params.id) {
        this.Id = params.id;
        // this.dataOnEdit(this.editId);
      }
    });
    this.checkORnot={};
    /*
    this.myObje =[ {"id":1,"name":"a", "age":1,"cars": "../../../../assets/images/1.jpg"},
                    {"id":2,"name":"b", "age":2,"cars": "../../../../assets/images/2.jpg"},
                    {"id":3,"name":"c", "age":3,"cars": "../../../../assets/images/3.jpg"},
                    {"id":4,"name":"d", "age":4,"cars": "../../../../assets/images/4.jpg"},
                    {"id":5,"name":"e", "age":5,"cars": "../../../../assets/images/5.jpg"},
                    {"id":6,"name":"f", "age":6,"cars": "../../../../assets/images/6.jpg"},
                    {"id":7,"name":"g", "age":7,"cars": "../../../../assets/images/7.jpg"},
                    {"id":8,"name":"h", "age":8,"cars": "../../../../assets/images/8.jpg"},
                    {"id":9,"name":"i", "age":9,"cars": "../../../../assets/images/9.jpg"},
                    {"id":10,"name":"j", "age":10,"cars": "../../../../assets/images/10.jpg"}
                  ]
                  */
// this.subscribe= this.platform.backButton.subscribeWithPriority(666666,()=>{
//   if(this.constructor.name=="HomePage"){
//     if(window.confirm("Do you want to exit app ?")){
//       navigator["app"].exitApp();
//     }
//   }
// })




  }

  addtoCart(i){
     let d=i;
    // console.log(d);

  }

  focOrderSelected() {
    this.clopase=true;
    let link = `ProductCategories/getCatagorysearch?`;
    if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    if (!this.prod.CompanyID) link += '&ComID=' + localStorage.getItem('com');
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.selectedcatagorys = res;
     // console.log(res);
    });
  }

  companywisecatagory() {
    let link = `ProductCategories/getCompanyWiseCatagory?`;
    if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    if (!this.prod.CompanyID) link += '&ComID=' + localStorage.getItem('com');
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.selectedcatagorys = res;
this.total= this.selectedcatagorys[0].total;

     // console.log(res);
    });
  }


  ngOnInit() {
    this.call= true
    if(this.Id)
    {
      this.clopase=true;
      this.companywisecatagory();
      this.selectedcatagorys = [];
    }

   else if(localStorage.getItem('com'))
    {
      this.companywisecatagory();
      this.selectedcatagorys = [];
    }else{
      this. focOrderSelected();
      this.selectedcatagorys = [];
    }
    
    this.checkVersion();
 
  }

  checkVersion(){
    this.api.getdata('feedbacks/getcheckVersion').subscribe((res: any) => {   
      this.Version = res;
      console.log("this.Version");
      console.log(this.Version);
      if(this.Version[0].VersionNo != 1){
        console.log("this.Versionnewton");
        this.presentAlertConfirm();
      }else{
   
      }    
   
    }, err => {
      console.log('err', this.Version);
    });
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'App Update available!',
      message: '** There is a new version available, would you like to get it now ? **',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Download',
          handler: () => {
            console.log('Confirm Okay');
            this.iab.create('https://play.google.com/store/apps/details?id=com.facebook.lite','_blank');
          }
        }
      ]
    });

    await alert.present();
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
 
ionViewWillEnter()
  {  this.use=localStorage.getItem('umane')
   this.ui=localStorage.getItem('uid') 
    try {
      if(!this.call)
     {
      this.clopase=true;
      if(localStorage.getItem('com'))
      {
        this.companywisecatagory();
        this.selectedcatagorys = [];
      }else{
        this. focOrderSelected();
        this.selectedcatagorys = [];
      } 
    }

    } catch(error) 
    { } 
   
  }

  
  ionViewDidLeave()
  {
    //console.log("it will leave")
    this.call=false
  }
    

  Latestproduct(){
    let link = `ProductCategories/getCompanyWiselastCatagory?`;
    if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    if (!this.prod.CompanyID) link += '&ComID=' + localStorage.getItem('com');
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.selectedcatagorys = res;
     // console.log(res);
    });
  }
  Allproduct(){
    this.selectedcatagorys = [];
    this.companywisecatagory();
   
  }
}
