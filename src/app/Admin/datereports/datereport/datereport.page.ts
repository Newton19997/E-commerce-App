import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-datereport',
  templateUrl: './datereport.page.html',
  styleUrls: ['./datereport.page.scss'],
})
export class DatereportPage implements OnInit {
  product: any;
  selectedcatagorys:any;
  call : boolean=false;
  checkORnot:any;
  login:any;
  constructor(public api: ApiService ,private route: ActivatedRoute,public toastController: ToastController,private routes: Router ) {
   
   }

  ngOnInit() {  
    this.call= true
    this.focOrderSelected();
    this.login=localStorage.getItem('uid');
    console.log("this.login")
    console.log(this.login)
  }



  focOrderSelected() {
    let link = `localBazzars/getproduct?`;
    if (this.product) link += '&catname=' + encodeURIComponent(this.product);
    this.api.getdata(link).subscribe((res: any) => {
    //this.api.getdata('ProductCategories/getCatagory?catname=' + this.prod.product).subscribe((res: any) => {
      this.selectedcatagorys = res;
      console.log(res);
    });
  }

  ionViewWillEnter()
  {  
  /*
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
   
  } */
    
      if(!this.call)
     {
     
        this. focOrderSelected();
        this.selectedcatagorys = [];
        this.login=parseInt(localStorage.getItem('uid'));
      }
  
  } 
   

  
  ionViewDidLeave()
  {
    //console.log("it will leave")
    this.call=false
  }

  AddYourProduct(){
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      this.usercheck('You can login after Add product ');   
      return;
    }

    try {
      if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
      {
        this.usercheck('You can login after Add product ');       
      return;
       
      }else{
        this.routes.navigateByUrl('/local-bazzar');
      }

     
    } catch (error) {
   // this.api.showWarningToast('insert failed..' + error);
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
  console.log('toast Dismissed !')
  });
  //for massage end
  this.routes.navigateByUrl('/login');
}

}
