import { NgModule } from '@angular/core';
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
  selector: 'app-cos',
  templateUrl: './cos.page.html',
  styleUrls: ['./cos.page.scss'],
})

export class CosPage implements OnInit { 
  name: any;
  id: any;
  items: any[];

  myObje:any;
  prod:any;
  selectedcatagorys: any;
  selecteditems:any;
  cId: any;
  companyID: any;
  checkORnot:any;
  call : boolean=false;
  constructor(public api: ApiService, public route: ActivatedRoute,private routes: Router,public toastController: ToastController) {
    this.prod = new searchome();
    this.route.params.subscribe(params => {
      if (params.cid) {
        this.cId = params.cid;
        this.companyID = params.CampanyID;
        // this.dataOnEdit(this.editId);
      }
    });
   
    this.checkORnot={};
    /*this.myObje =[ {"id":1,"name":"a", "age":1,"cars": "../../../../assets/images/1.jpg"},
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

  }

  addtoCart(i){
     let d=i;
    // console.log(d);

  }


  
  // constructor() {
  //   this.items=[
  //     {name:'My Company',id:1},    
  //     {name:'newton Company',id:2},
  //     {name:'sohel Company',id:3},
  //     {name:'xx Company',id:4},
  //     {name:'Second Company',id:5}
  //   ]
  //  }

  focOrderSelected() {
    console.log("ok");
    
    let link = `ProductCategories/getCatagory?`;
    if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.selectedcatagorys = res;
      // console.log(res);
    });
  }
  funLoadItemCompanyAndCatagoryWise() {
    // console.log(this.cId);
    // console.log(this.companyID);
    let link = `ItemMasters/LoadItemCompanyAndCatagoryWise?`;
    if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    if (!this.prod.CompanyID) link += '&ComID=' + this.companyID;
    if (!this.prod.catagory) link += '&CID=' + this.cId ;
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.selecteditems = res;
      // console.log(res);
    });
  }

  ngOnInit() {
    this.call= true
    this.funLoadItemCompanyAndCatagoryWise();
   // this.focOrderSelected();
    this.selectedcatagorys = [];
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
    console.log('toast Dismissed !')
    });
    //for massage end
    this.routes.navigateByUrl('/login');
  }
    ionViewWillEnter()
    {  
      try {
        if(!this.call)
        {
        // this.totalPrice=0;
         this.funLoadItemCompanyAndCatagoryWise();
        }
     /*
        this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));
        this.checkORnot.userid=parseInt(localStorage.getItem('uid'));
        this.checkORnot.mobile=localStorage.getItem('use');
        this.checkORnot.password=localStorage.getItem('pas');
       
        this.api.postdata('UserIns/user_Checkornot', this.checkORnot).subscribe((rsq: any) => {
        console.log(rsq);
        console.log(rsq.data[0].id)
        if(rsq.data[0].id == 0){
         // this.reset();
          this.usercheck("Please login");
        }
      });
      */
      } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    } 
     
    }

ionViewDidLeave()
  {
   // console.log("it will leave")
    this.call=false
  }

}
