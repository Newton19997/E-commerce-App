import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
export class order {
                      oid: any;
                      uname: any;
                      iname: any;
                      quntity: any;
                        price: any;
                      totalprice: any;
                      status: any;
                      image: any;
                      EDate: any;
                      orderDate: any;
                      CompanyID: any;
                      remarks: any;
                      iid: any;
                      paymentID: any;
                      userID : any;
                      productSize: any;
                      productSizeID:any;
                      colorName:any;
                    }
@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.page.html',
  styleUrls: ['./itemview.page.scss'],
})
export class ItemviewPage implements OnInit {
  myObje:any;
  string: any;
  cId: any;
  companyID: any;
  iid: any;
  selecteditems:any;
  prod:any;
  changeText: boolean;
  one: boolean;
  Two: boolean;
  Three: boolean;
  stokqty:any;
  call : boolean=false;
  checkORnot:any;

    slidersopt={
    zoom:{
      maxRatio:3
    }
  };
  constructor(public api: ApiService, public route: ActivatedRoute,private routes: Router,public toastController: ToastController) {
    this.one= true;
    this.Two= false;
    this.Three= false;

    this.prod = new order();
    this.route.params.subscribe(params => {
      if (params.cid) {
        this.companyID = params.CompanyID;
        this.cId = params.cid;        
        this.iid = params.iid;
        // this.dataOnEdit(this.editId);
      }
    });

    // this.myObje =[ 
    //                {"id":1,"name":"Benz built","discretion":"Karl Benz built the first car in 1885, and since then many thousands of companies have sprung up trying (or even three) first cars…","balanceqty":"10", "price":5900009,"cars": "../../../../assets/images/1.jpg"}
    //              ]
    
                 this.string="../../../../assets/upimg/images.png";
         

                 this.changeText = false;
                 this.checkORnot={};
   }

   changeimageOne(){
    this.one= true;
    this.Two= false;
    this.Three= false;
   }
   changeimageTwo(){
    this.one= false;
    this.Two= true;
    this.Three= false;
   // this.changeText = false;

   }
    changeimageThree(){
    this.one= false;
    this.Two= false;
     this.Three= true;
   // this.changeText = true;
   }

 


  funItembuying() {
    // console.log(this.cId);
    // console.log(this.companyID);
    this.api.getdata('ItemMasters/LoadItemForbuy?ComID=' + this.companyID + '&CID=' +  this.cId + '&IID=' +this.iid).subscribe((res: any) => {
    // let link = `ItemMasters/LoadItemForbuy?`; 
    // if (!this.prod.CompanyID) link += '&ComID=' + this.companyID;
    // if (!this.prod.catagory) link += '&CID=' + this.cId ;
    // if (!this.prod.catagory) link += '&CID=' + this.iid ;
    // this.api.getdata(link).subscribe((res: any) => {
  
      this.selecteditems = res;
      this.stokqty= res[0].aquantity;
      console.log(res);
    });
  }


  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.call= true
    console.log('ok');

    console.log(localStorage.getItem('uid')); 

    console.log(localStorage.getItem('use'));
    console.log(localStorage.getItem('pas'));
    console.log(localStorage.getItem('com'));

    this.funItembuying();
  }

async successorder(){
  const toast = await this.toastController.create({
    message: 'Order Successful',
    duration: 2000,
    animated:false, 
    position:'middle', 
    color:'warning',
    });  
  toast.present();
  toast.onDidDismiss().then((val)=>{
  console.log('toast Dismissed !')
  });
   this.routes.navigateByUrl('/category');
}

async UNsuccessorder(){
  const toast = await this.toastController.create({
    message: 'Order Faild',
    duration: 2000,
    animated:false, 
    position:'middle', 
    color:'warning',
    });  
  toast.present();
  toast.onDidDismiss().then((val)=>{
  console.log('toast Dismissed !')
  });
   this.routes.navigateByUrl('/category');
}


  async InsettOrder() { 
  
        this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));
        this.checkORnot.userid=parseInt(localStorage.getItem('uid'));
        this.checkORnot.mobile=localStorage.getItem('use');
        this.checkORnot.password=localStorage.getItem('pas');
       
        this.api.postdata('UserIns/user_Checkornot', this.checkORnot).subscribe((rsq: any) => {
        // console.log(rsq);
        // console.log(rsq.data[0].id)
        if(rsq.data[0].id == 0){
         // this.reset();
          this.UNLogin();
          return;
        }
      });
      
      if(this.prod.quntity <= "0" || this.prod.quntity <= "0.0" || this.prod.quntity <= "0.00" || this.prod.quntity <= "0.000"){
         console.log("1st if")
         console.log(this.prod.quntity)
     //for massage
    const toast = await this.toastController.create({
      message: "Order Qty can't be 0 Qty",
      duration: 2000,
       animated:false, 
      position:'top', 
      color:'warning',
      });  
      toast.present();
       toast.onDidDismiss().then((val)=>{
      console.log('toast Dismissed !')
      });
   
      this.prod.quntity='';
     // console.log('nn '+this.prod.ReduceQty);
     return;
      }

    const data = {
      'data': { 'record': this.selecteditems,
        'byuQty': this.prod.quntity,
        'Size': this.prod.productSize,
        'useid':localStorage.getItem('uid'),
        'username':localStorage.getItem('use')
      }};
    console.log(data);
   
    if(!localStorage.getItem('uid') && !localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
{
  this.UNLogin();
 

 
}else{
  await  this.api.postdata('order/InsertUserOrder', data).subscribe((res: any) => {
    console.log(res);

    if(res.data.length > 0)
           { 
            this.successorder();
            this.prod.quntity=null;
            //  this.routes.navigateByUrl('/admin');
           }
           else {
            this.UNsuccessorder();
            this.prod.quntity=null;
             //this.api.showSuccessToast('Login faild');
       
           }
  });
  }
  }

  async UNLogin(){
    const toast = await this.toastController.create({
      message: 'You can login after buy',
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

  ionViewWillEnter()
  { 
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      this.UNLogin();
      return;
    }
    
    if(!this.call)
     {
      this.funItembuying();
      this.prod.quntity=null;
      if(!localStorage.getItem('uid')){
        this.UNLogin();

        // this.routes.navigateByUrl('/login');
       }
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
      this.UNLogin();
      return;
    }
  });
   
  }

  ionViewDidLeave()
  {
    // console.log("it will leave")
    this.call=false
  }

  async checkQTY(e){   
    //   console.log(this.prod.ReduceQty);
    // console.log(this.prod.ReduceQty);
    if(this.stokqty<e.target.value)
    {
     this.massagefor("Order Qty can't be large stock Qty")
     this.prod.quntity='';
        // this.prod.ReduceQty
        // console.log('n '+this.prod.ReduceQty);
      return;
      }
    }

    async massagefor(mas: any){
             //for massage
   const toast = await this.toastController.create({
    message: mas,
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


    async checkaddQTy(e) {   
      // console.log('newgg')
      // console.log(e)
      this.prod.quntity=e.target.value;
      if(this.selecteditems[0].ListItem == 'Kg'){
        if(this.stokqty<e.target.value)
        {
        this.massagefor("Order Qty can't be large stock Qty")
        this.prod.quntity='';
          // this.prod.ReduceQty
          // console.log('n '+this.prod.ReduceQty);
        return;
        }
      }  
else{

  console.log(this.prod.quntity)
  if(this.prod.quntity === '0'){
  // console.log("1st if")
     //for massage
    const toast = await this.toastController.create({
     message: "Order Qty can't be 0 Qty",
     duration: 2000,
      animated:false, 
     position:'top', 
     color:'warning',
     });  
     toast.present();
      toast.onDidDismiss().then((val)=>{
     console.log('toast Dismissed !')
     });
  
     this.prod.quntity='';
    // console.log('nn '+this.prod.ReduceQty);
    return;
  }
if(this.stokqty<e.target.value)
{
this.massagefor("Order Qty can't be large stock Qty")
this.prod.quntity='';
  // this.prod.ReduceQty
  // console.log('n '+this.prod.ReduceQty);
return;
}
}
    }
    

}
