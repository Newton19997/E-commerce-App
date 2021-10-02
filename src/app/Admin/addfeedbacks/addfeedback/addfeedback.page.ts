import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.page.html',
  styleUrls: ['./addfeedback.page.scss'],
})
export class AddfeedbackPage implements OnInit {
  loadfeed:any;
  page = 1;
  pageSize =50;
  items = [];
  call : boolean=false;
 checkORnot:any;
 clopase=true;
 products:any;
 friends:any;
 MobileNo:any;
 no:any;
  constructor(public api: ApiService,private route: ActivatedRoute,public toastController: ToastController,private routes: Router ) { 
    this.checkORnot={};
  }

  ngOnInit() {
      // console.log('sdfs'+localStorage.getItem('com'));
   if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }
    this.call= true
    this.loadDatapayfeedback();
    this.loadCompanymobileNo();
  }

  loadCompanymobileNo(){   
    this.api.getdata('feedbacks/company_number?com=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.MobileNo = res;
     // console.log(res);
     // console.log( 'iteddma'+ res);
   this.no=  this.MobileNo[0].MobileNo;
        console.log(this.MobileNo);
    });
  }


loadDatapayfeedback(){
  this.clopase=true;
  this.items = [];
  this.api.getdata('feedbacks/loadfeedback?uid=' + localStorage.getItem('uid')).subscribe((res: any) => {
    this.loadfeed = res;
    console.log(res);
    console.log( 'iteddma'+ res);
    for (var i = 0; i < this.loadfeed.length; i++)
       { 
      this.items.push(this.loadfeed[i]);

      }
      console.log(this.items);
  });
}

ionViewWillEnter()
  { 
     //  console.log('sdfs'+localStorage.getItem('com'));
   if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }

  //  this.ui=localStorage.getItem('uid') 
    try {
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

      if(!this.call)
     {
      this.loadDatapayfeedback();
      this.loadCompanymobileNo();
    }

    } catch(error) 
    { } 
   
  }

  
  ionViewDidLeave()
  {
    //console.log("it will leave")
    this.call=false
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

  PaymentStatus(){
    this.items = [];
    this.loadDatapayfeedback();
  }

  FriendSalseproduct(){
    this. items = [];
    this.api.getdata('feedbacks/check_friend?usermobil=' + localStorage.getItem('use')).subscribe((res: any) => {
      this.friends = res;
      console.log(this.friends);
if(this.friends[0].friend !=0){
  this.api.getdata('feedbacks/local_bazar_topProduct?usermobil=' + localStorage.getItem('use')).subscribe((res: any) => {
    this.products = res;
   // console.log(res);
   // console.log( 'itema'+ res);
    for (var i = 0; i < this.products.length; i++)
       { 
      this.items.push(this.products[i]);

      }
      console.log(this.items);
  });
    }
    });
  
  }

}
