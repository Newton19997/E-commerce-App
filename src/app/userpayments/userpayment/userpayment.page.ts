import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-userpayment',
  templateUrl: './userpayment.page.html',
  styleUrls: ['./userpayment.page.scss'],
})
export class UserpaymentPage implements OnInit {
  prod:any;
  loadOrders: any;
  previousQty :any;
  quantity: any;
  print: any='';
  totalPrice: any;
  call : boolean=false;
  checkORnot:any;
  constructor(public api: ApiService, public route: ActivatedRoute,private routes: Router,public toastController: ToastController) {
    this.checkORnot={};
   }


  loadorderPaymentForuser() {
    // let link = `ProductCategories/getCompanyWiseCatagory?`;
    // if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    // if (!this.prod.CompanyID) link += '&ComID=' + localStorage.getItem('com');
    // this.api.getdata(link).subscribe((res: any) => {

   // console.log('Ng On int')
    this.api.getdata('order/loadorderPayment?uname=' + localStorage.getItem('uid')+ '&ComID=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.loadOrders = res;
     // console.log('check '+this.loadOrders)
      if(this.loadOrders.length>0){
      this.loadOrders.forEach((res)=>{
        // this.previousQty.push(res.quntity)
        // this.quantity.push(res.quntity)
       this.totalPrice+=(res.totalprice)
      })
    }
    else{
     // console.log('ok')
      this.totalPrice='';
    }
     // console.log(res);
    });
  }

  ionViewWillEnter()
  { 
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }

    this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));
    this.checkORnot.userid=parseInt(localStorage.getItem('uid'));
    this.checkORnot.mobile=localStorage.getItem('use');
    this.checkORnot.password=localStorage.getItem('pas');
   
    this.api.postdata('UserIns/user_Checkornot', this.checkORnot).subscribe((rsq: any) => {
    // console.log(rsq);
    // console.log(rsq.data[0].id)
    if(rsq.data[0].id == 0){
     // this.reset();
      this.UNLogin('You can login after Order');
      return;
    }
  });

    if(!localStorage.getItem('uid')){
        this.routes.navigateByUrl('/login');
      }
    if(!this.call)
     {
      this.totalPrice=0;
      this.loadorderPaymentForuser();
     }
    
   
  }

  ionViewDidLeave()
  {
    console.log("it will leave")
    this.call=false
  }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.totalPrice=0;
    this.loadorderPaymentForuser();
    this.call= true
    // this.previousQty=[]
    // this.quantity=[]
        
  }

  chackQty(e,index){
if(e == 0)
{
  this.warning("Sales qty can't be Zero");
      this.ngOnInit()
}
    if(this.loadOrders[index].aquantity<e)
    { 
      this.warning('Quantity is greater than available quantity');
      this.ngOnInit()
    }
  }

  async warning(massage: any){
    const toast = await this.toastController.create({
      message: massage,
      duration: 2000,
      animated:false, 
      position:'middle', 
      color:'warning',
      });  
    toast.present();
    toast.onDidDismiss().then((val)=>{
    console.log('toast Dismissed !')
    });
    // this.routes.navigateByUrl('/login');
  }


 async orderEdit(index){ 
   this.totalPrice=0;
      // console.log(this.loadOrders[index].quntity);
     if(this.loadOrders[index].quntity==0||this.loadOrders[index].quntity==null)
     {
       this.warning("quantity can not 0 or null");
       this.ngOnInit()
       return;
     }
      const data = {
        'data': { 'record': this.loadOrders[index],
          'byuQty': this.loadOrders[index].quntity,
          'Size': 0,
          'useid':localStorage.getItem('uid'),
          'username':localStorage.getItem('use')
        }};
      console.log(data);
     
      if(!localStorage.getItem('uid') && !localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
  {
    this.UNLogin('You can login after edit Order');
   
  
   
  }else{
    await  this.api.patchdata('order/EditUserOrder', data).subscribe((res: any) => {
      console.log(res);
  
     // if(res.data.length > 0)
      if(res.data[0].ORDID != 0)
             { 
              this.warning('Order Edit successfull');
              this.ngOnInit()
             // this.successorder();
              //  this.routes.navigateByUrl('/admin');
             }
             else {
              this.warning('Order Edit Not successfull');
              this.ngOnInit()
             // this.UNsuccessorder();
               //this.api.showSuccessToast('Login faild');
         
             }
    });
    }
  

  }

 async orderDelete(index){
  this.totalPrice=0;
 // console.log(this.loadOrders[index].quntity);
 if(this.loadOrders[index].quntity==0||this.loadOrders[index].quntity==null)
 {
   this.warning("quantity can not 0 or null");
   this.ngOnInit()
   return;
 }
    const data = {
      'data': { 'record': this.loadOrders[index],
        'byuQty':  this.loadOrders[index].quntity,
        'Size': 0,
        'useid':localStorage.getItem('uid'),
        'username':localStorage.getItem('use')
      }};
    console.log(data);
   
    if(!localStorage.getItem('uid') && !localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
{
  this.UNLogin('You can login after Order Delete');
 

 
}else{
  await  this.api.patchdata('order/deleteUserOrder', data).subscribe((res: any) => {
    console.log(res);

    if(res.data.length > 0)
           { 
            this.warning('Order delete successfull');
            this.ngOnInit()
           // this.successorder();
            //  this.routes.navigateByUrl('/admin');
           }
           else {
            this.warning('Order delete Not successfull');
            this.ngOnInit()
           // this.UNsuccessorder();
             //this.api.showSuccessToast('Login faild');
       
           }
  });
  }
  }

  async UNLogin(message:any){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      animated:false, 
      position:'middle', 
      color:'warning',
      });  
    toast.present();
    toast.onDidDismiss().then((val)=>{
    console.log('toast Dismissed !')
    });
    this.routes.navigateByUrl('/login');
  }
}
