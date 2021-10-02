import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
export class searchome {
  product: any;
  catagory:any;
  CompanyID: any;
  }
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  items: any[];
  prod:any;
  comcatagorys: any;
  checkORnot:any;
  call : boolean=false;
  constructor(public api: ApiService, private route: ActivatedRoute,private routes: Router,public toastController: ToastController) {
    this.prod = new searchome();
    this.checkORnot={};
/*
    this.items =[ {"cid":1,"cname":"a", "CmopanyName":"sdMaheen Labdfgel tex","Cimage": "../../../../assets/images/1.jpg"},
                    {"cid":2,"cname":"b", "CmopanyName":"sdMaheen Lafgbel tex","Cimage": "../../../../assets/images/2.jpg"},
                    {"cid":3,"cname":"c", "CmopanyName":"Maheen Ladfgbel tex","Cimage": "../../../../assets/images/3.jpg"},
                    {"cid":4,"cname":"d", "CmopanyName":"saMaheen dfgLabel tex","Cimage": "../../../../assets/images/4.jpg"},
                    {"cid":5,"cname":"e", "CmopanyName":"sMaheen Ldgabel tex","Cimage": "../../../../assets/images/5.jpg"},
                    {"cid":6,"cname":"f", "CmopanyName":"Maheen fgLabel tex","Cimage": "../../../../assets/images/6.jpg"},
                    {"cid":7,"cname":"g", "CmopanyName":"Maheen dLabdfgel tex","Cimage": "../../../../assets/images/7.jpg"},
                    {"cid":8,"cname":"h", "CmopanyName":"Maheen dLabel tex","Cimage": "../../../../assets/images/8.jpg"},
                    {"cid":9,"cname":"i", "CmopanyName":"Maheen dLafdgbel tex","Cimage": "../../../../assets/images/9.jpg"},
                    {"cid":10,"cname":"j", "CmopanyName":"Mdfaheen Lafgbel tex","Cimage": "../../../../assets/images/10.jpg"}
                  ]
*/

   }

   companywisecatagory() {
    let link = `ProductCategories/getCompanyWiseCatagory?`;
    if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    if (!this.prod.CompanyID) link += '&ComID=' + localStorage.getItem('com');
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.comcatagorys = res;
     // console.log(res);
    });
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
  {  
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
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
    this.companywisecatagory();
  }
   
  }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.call= true
   // console.log(localStorage.getItem('com'));
    this.companywisecatagory();
  }
  ionViewDidLeave()
  {
   // console.log("it will leave")
    this.call=false
  }
}
