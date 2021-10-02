import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
export class addqtyitems {
  cid:any;
  iid: any;
  CompanyID: any; 
  balanceQyt: any;  
  addQty:any;
  ReduceQty:any;
  rate:any;

}
@Component({
  selector: 'app-addquantity',
  templateUrl: './addquantity.page.html',
  styleUrls: ['./addquantity.page.scss'],
})
export class AddquantityPage implements OnInit {
  companyWisecatagorys:any;
  companyWisecatagoryitems:any;
  prods:any;
  itemsDelails:any;
  companyError=true;
  catagoryError=true;
  itemError=true;
  master:any;
  today: number;
  response:any;
  responseitems:any;
  prod: any;
  topicError=true;
  


  iid:any;
  QtID:any;
  Idwiseprod:any;

  vaddQty:any;
  vReduceQty:any;
  prices:any;
  pricess:any;

  UpdateQty:any
  mas:any;
  checkORnot:any;
  rates:any;
  ratess:any;
  call : boolean=false;
  constructor(public api: ApiService, private route: ActivatedRoute,private routes: Router,public toastController: ToastController) {
    this.prod = new addqtyitems();
    this.today = Date.now()+6*3600*1000;
    this.master = {entrydate: this.today,statusID:0};

        //for edit
this.route.params.subscribe( param => {
  if (param.id) {
    this.iid=param.id;
    this.QtID=param.QtID;
   this.getProduct(param.id);
  }
});
this.UpdateQty={};
this.checkORnot={};
   }

   ionViewDidLeave()
{
  this.call= false;
}

   ionViewWillEnter()
   { 
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    } 
     try {
    
       this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));   
       this.checkORnot.uname=localStorage.getItem('use');
       this.checkORnot.password=localStorage.getItem('pas');
      
       this.api.postdata('UserIns/check_companyadmin', this.checkORnot).subscribe((rsq: any) => {
      // console.log(rsq);
      // console.log(rsq.data[0].id)
       if(rsq.data[0].id == 0){
        // this.reset();
         this.usercheck("Please login");
       }
     });
     } catch (error) {
    // this.api.showWarningToast('insert failed..' + error);
   } 
      if(!this.call)
       {
        this.loadCompany();
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
    this.routes.navigateByUrl('/adlogin');
  }
   getProduct(id) {
    this.api.getdata('ItemMasters/loadgetItenIdWise?comid='+ localStorage.getItem('com') +'&iid='+ id).subscribe(res => {
      this.Idwiseprod = res;
      console.log(this.Idwiseprod);
      this.vaddQty=this.Idwiseprod[0].addQty;
     // this.vReduceQty=this.Idwiseprod[0].addQty;
     this.prod.addQty=this.Idwiseprod[0].addQty;
     this.prod.ReduceQty=this.Idwiseprod[0].addQty;
     this.prices=this.Idwiseprod[0].price; 
     this.rates=this.Idwiseprod[0].rate; 
    // this.Idwiseprod[0].aquantity
    }, err => {
      console.log('err ', this.Idwiseprod);

    });
  }

   validatecompany(value){
    if(value === "default"){
     this.companyError=true;
    }else{
      this.companyError=false;
    }
  }

  validatecatagory(value){
    if(value === "default"){
      this.catagoryError=true;
    }else{
      this.catagoryError=false;
    }
  }

  
   validateTopic(value){
    if(value === "default"){
     this.topicError=true;
    }else{
      this.topicError=false;
    }
  }

  validateitem(value){
    if(value === "default"){
      this.itemError=true;
    }else{
      this.itemError=false;
    }
  }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.loadCompany();
    //this.getcompanyWisecatagorys();
    this.call= true;
    
  }
  loadCompany(){
    this.api.getdata('ProductCategories/getCompany?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.prods = res;
     // console.log(res);
      this.prod.CompanyID=this.prods[0].CampanyID;
      this.getcompanyWisecatagorys();
    }, err => {
      console.log('err', this.prods);
    });
  }

  getcompanyWisecatagorys()
  {
    this.api.getdata('ProductCategories?filter[where][CampanyID]=' + localStorage.getItem('com') +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
      this.companyWisecatagorys = res;

      this.prod.cid= this.Idwiseprod[0].cid;
      this.getcompanyandcatagoryWiseitems();
      console.log(res);
    }, err => {
      console.log('err', this.companyWisecatagorys);
    });
  }

  getcompanyandcatagoryWiseitems()
  {
    this.api.getdata('ItemMasters?filter[where][CompanyID]=' + localStorage.getItem('com') + '&filter[where][cid]='+this.prod.cid +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
      this.companyWisecatagoryitems = res;
      this.prod.iid= this.Idwiseprod[0].iid;
      this.getcompanyandcatagoryanditemwiseDetalis();
      console.log(res);
    }, err => {
      console.log('err', this.companyWisecatagoryitems);
    });
  }

  getcompanyandcatagoryanditemwiseDetalis()
  {
    this.api.getdata('ItemMasters?filter[where][CompanyID]=' + localStorage.getItem('com') + '&filter[where][iid]='+this.prod.iid+ '&filter[where][cid]='+this.prod.cid +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
      this.itemsDelails = res;
      console.log(this.itemsDelails);
    }, err => {
      console.log('err', this.itemsDelails);
    });
  }
  //  {
  //  // this.updateMode = false;
  //   this.api.getdata('offset-wastages/orderDetails?workorder=' + this.order)
  //     .subscribe((res: any[]) => this.orderDetails = res);
  // }

  patch() {
// if(!this.prod.CompanyID && !this.prod.cid && !this.prod.iid ){
//   console.log(this.prod.CompanyID)
//   console.log(this.prod.cid)
//   console.log(this.prod.iid)
//  return;
// }
    
    this.prod.entrydate=this.master.entrydate, this.prod.statusID=this.master.statusID,this.prod.balanceQyt=this.itemsDelails[0].aquantity,this.prod.price=this.prices,this.prod.rate=this.rates;
    
    console.log(this.prod);
    this.api.patchdata('itemadds', this.prod).subscribe(res=> {
      this.response = res;    
      this.api.patchdata('ItemMasters/UpdateItemQtys', {data:[this.prod]}).subscribe(async (res1: any) => {     
        this.responseitems = res1;
        console.log("res1");
                console.log(res1);
                console.log(res); 

      }, err => {
      //  this.api.showFailureToast('Error', err.message);
        console.log(err);
      });


  
    }, err => {
     // this.api.showFailureToast('Error', err.message);
      console.log(err);
    });
   // this.get();
   this.routes.navigateByUrl('/addqtydetail');
   
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }


  async checkrate(e){
    this.rates=e.target.value;
   /* if(!this.rates){
     
     
       //for massage
 const toast = await this.toastController.create({
  message: 'Your prices can'+'t'+'+ empty+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.rates=this.Idwiseprod[0].rate
      //for massage end
     
    return;
    }*/
    if(this.rates==='0'){
     
    
       //for massage
 const toast = await this.toastController.create({
  message: 'Your prices can'+'t'+'+ Zero+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.rates=this.Idwiseprod[0].rate
      //for massage end
     
    return;
    }
  }

  async checkprice(e){
    this.prices=e.target.value;
   /* if(!this.prices){
     
     
       //for massage
 const toast = await this.toastController.create({
  message: 'Your prices can'+'t'+'+ empty+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.prices=this.Idwiseprod[0].price
      //for massage end
     
    return;
    }*/
    if(this.prices==='0'){
     
    
       //for massage
 const toast = await this.toastController.create({
  message: 'Your prices can'+'t'+'+ Zero+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.prices=this.Idwiseprod[0].price
      //for massage end
     
    return;
    }
  }

  async checkReduce(e){
   
  //   console.log(this.prod.ReduceQty);
  this.prod.ReduceQty=e.target.value;
    if(!this.prod.ReduceQty){
     
       //for massage
 const toast = await this.toastController.create({
  message: 'Your ReduceQty can'+'t'+'+ empty+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.prod.ReduceQty=this.Idwiseprod[0].addQty
//for massage end
      // this.prod.ReduceQty
      // console.log('n '+this.prod.ReduceQty);
    return;
    }
   else if(this.prod.ReduceQty == 0){
   
       //for massage
 const toast = await this.toastController.create({
  message: 'Your ReduceQty can'+'t'+'+ Zero+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
    
      this.prod.ReduceQty=this.Idwiseprod[0].addQty
      // console.log('nn '+this.prod.ReduceQty);
      return;
    }
   else if(this.Idwiseprod[0].addQty< this.prod.ReduceQty){
      console.log('nnn '+this.prod.ReduceQty);
   
       //for massage
 const toast = await this.toastController.create({
  message: 'Your ReduceQty can'+'t'+'+ large+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.prod.ReduceQty=this.Idwiseprod[0].addQty
     return;
    }
  }

 async checkAddqty(e){
    this.prod.addQty=e.target.value;
   /* if(!this.prod.addQty){
     
     
       //for massage
 const toast = await this.toastController.create({
  message: 'Your prices can'+'t'+'+ empty+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
      
      this.prod.addQty=this.Idwiseprod[0].addQty
      //for massage end
     
    return;
    }*/
    if(this.prod.addQty==='0'){
     
     
       //for massage
 const toast = await this.toastController.create({
  message: 'Your prices can'+'t'+'+ Zero+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
      
      this.prod.addQty=this.Idwiseprod[0].addQty
      //for massage end
     
    return;
    }
  }


reset(){
  this.routes.navigateByUrl('/addqtydetail');
}
Edit(){
  try {
    // this.prods.CompanyID=parseInt(localStorage.getItem('com'));
    // this.prods.fname=this.prod.fname;
    // this.prods.mobile=this.prod.mobile;
    // this.prods.password=this.prod.password;
    // this.prods.newPassword=this.prod.newpassword;

    
  this.UpdateQty.iid=parseInt(this.Idwiseprod[0].iid);
  this.UpdateQty.cid= parseInt(this.Idwiseprod[0].cid);
  this.UpdateQty.CompanyID=parseInt(this.Idwiseprod[0].CompanyID);
  this.UpdateQty.addqty=parseInt(this.prod.ReduceQty);
  this.UpdateQty.QtID=parseInt(this.Idwiseprod[0].QtID);


    this.api.postdata('ItemMasters/dataUpdate', this.UpdateQty).subscribe(async(rsq: any) => {
    // console.log(rsq);
    // console.log(rsq.data[0].id)
    if(rsq.data[0].id == 1){
      this.reset();
      //for massage
const toast = await this.toastController.create({
message: 'Your Update have been Changed.',
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
      this.reset();
      //for massage
const toast = await this.toastController.create({
message: 'Your Update has been not Changed.',
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
/*
Edit(){

  this.UpdateQty.iid=this.Idwiseprod[0].iid
  this.UpdateQty.cid= this.Idwiseprod[0].cid
  this.UpdateQty.CompanyID=this.Idwiseprod[0].CompanyID
  this.UpdateQty.addqty=this.prod.ReduceQty
  this.UpdateQty.QtID=this.Idwiseprod[0].QtID


 
  this.prod.entrydate=this.master.entrydate, this.prod.statusID=this.master.statusID,this.prod.balanceQyt=this.itemsDelails[0].aquantity;
  this.prod.QtID=this.QtID;
  console.log(this.prod);
  this.api.patchdata('itemadds', this.prod).subscribe(async(res:any)=>{
    this.response = res;  
    this.api.patchdata('ItemMasters/EDITUpdateItemQtys', {data:[this.prod]}).subscribe(async (res1: any) => {     
     // this.responseitems = res1;
    }, err => {
      //  this.api.showFailureToast('Error', err.message);
        console.log(err);
      });
     if(res[0].length){
 //for massage
 const toast = await this.toastController.create({
  message: 'Your Qty have been Changed.',
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
this.routes.navigateByUrl('/addqtydetail');
      }
      else{
        this.reset();
        //for massage
const toast = await this.toastController.create({
  message: 'Your Qty has been not Changed.',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
this.routes.navigateByUrl('/addqtydetail');
//for massage end
}
  
//   }, err => {
   
//     console.log(err);
   });

//  this.routes.navigateByUrl('/addqtydetail');
 
}
*/


btnprice(){
 // console.log("ok")
 // this.api.get('ItemMasters/Updateprices', {data:[this.prod]}).subscribe(async (res1: any) => {   
  this.api.getdata('ItemMasters/Updateprices?Company=' + localStorage.getItem('com') + '&iid='+this.prod.iid+ '&price='+this.prices+'&rate='+this.rates).subscribe(async(res: any) => {   
    this.pricess = res;
    console.log( this.pricess)
    this.api.getdata('ItemMasters/add_Updateprices?QtID='+this.Idwiseprod[0].QtID +' &Company=' + localStorage.getItem('com') + '&iid='+this.prod.iid+ '&cid='+this.Idwiseprod[0].cid+'&rate='+this.rates+'&price='+this.prices).subscribe(async(res1: any) => {   
      this.ratess = res1;
      console.log( this.ratess)
    });

    if(res[0].id>0){

     

  //for massage
  const toast = await this.toastController.create({
    message: 'Your Price have been Changed.',
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
  this.routes.navigateByUrl('/addqtydetail');
        }
        else{
          this.reset();
          //for massage
  const toast = await this.toastController.create({
    message: 'Your Price has been not Changed.',
    duration: 2000,
    animated:false, 
    position:'top', 
    color:'warning',
    });  
  toast.present();
  toast.onDidDismiss().then((val)=>{
  console.log('toast Dismissed !')
  });
  this.routes.navigateByUrl('/addqtydetail');
  //for massage end
    }
    console.log(res)
  }, err => {
  //  this.api.showFailureToast('Error', err.message);
    console.log(err);
  });
}

async onChange(e) {

   
  //   console.log(this.prod.ReduceQty);
  // console.log(this.prod.ReduceQty);
  this.prod.ReduceQty=e.target.value;
  /*  if(!this.prod.ReduceQty){     
 const toast = await this.toastController.create({
  message: 'Your ReduceQty can'+'t'+'+ empty+ ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});   
 this.prod.ReduceQty=this.Idwiseprod[0].addQty

    return;
   }*/

   console.log(this.prod.ReduceQty)
    if(this.prod.ReduceQty === '0'){
     console.log("1st if")
       //for massage
      const toast = await this.toastController.create({
       message: 'Your ReduceQty can'+'t'+'+ Zero+ ',
       duration: 2000,
        animated:false, 
       position:'top', 
       color:'warning',
       });  
       toast.present();
        toast.onDidDismiss().then((val)=>{
       console.log('toast Dismissed !')
       });
    
      this.prod.ReduceQty=this.Idwiseprod[0].addQty
      // console.log('nn '+this.prod.ReduceQty);
      return;
    }

   if(this.Idwiseprod[0].addQty< this.prod.ReduceQty){
      console.log('nnn '+this.prod.ReduceQty);
      console.log("2nd if")
       //for massage
 const toast = await this.toastController.create({
  message: 'Your ReduceQty can'+'t'+'+ large+ addQty ',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
     
      this.prod.ReduceQty=this.Idwiseprod[0].addQty
     return;
    }
}


}
