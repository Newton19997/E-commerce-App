import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastController } from '@ionic/angular';
export class payment {
  pid: any;
  uname: any;
  amount: any;
  type: any;
  bank: any;
  branch: any;
  cardno: any;
  cvvno: any;
  paystatusID: any;
  payAmount: any;
  remarks : any;
  CompanyID: any;
  cardType:any;
  userid:any;
 }

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
 typename:any

  // mySelect = '0';
  selectedValue: any;


  // data = [
  //   {
  //     id: 1,
  //     name: 'Dakota Gaylord PhD',
  //     address: '14554 Smith Mews'
  //   },
  //   {
  //     id: 2,
  //     name: 'Maria Legros',
  //     address: '002 Pagac Drives'
  //   },
  //   {
  //     id: 3,
  //     name: 'Brandyn Fritsch',
  //     address: '8542 Lowe Mountain'
  //   },
  //   {
  //     id: 4,
  //     name: 'Glenna Ward V',
  //     address: '1260 Oda Summit'
  //   },
  //   {
  //     id: 5,
  //     name: 'Jamie Veum',
  //     address: '5017 Lowe Route'
  //   }
  // ];



  prod:any;
  loadAmounts: any;
  typeError:any;
  bankError:any;
  collapse = false;
  types:any;
  banks:any;
  checkORnot:any;
  constructor(public api: ApiService, public route: ActivatedRoute,private routes: Router,public toastController: ToastController) {
    console.log("constractor")
    this.prod = new payment();
    this.prod.type=0;
    this.prod.cardType=0;
    this.checkORnot={};
   }
   portChange(event: { component: IonicSelectableComponent,  value: any }) {
    console.log('Bank:', event.value);
  }

  loadPayment() {
    // let link = `ProductCategories/getCompanyWiseCatagory?`;
    // if ( this.prod.product) link += '&catname=' + encodeURIComponent(this.prod.product);
    // if (!this.prod.CompanyID) link += '&ComID=' + localStorage.getItem('com');
    // this.api.getdata(link).subscribe((res: any) => {
    this.api.getdata('order/beforeinsertPayment?uname=' + localStorage.getItem('uid')+ '&ComID=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.loadAmounts = res;
      console.log(res);
    });
    this. getPaymentmode();
  }
  async UNLogin(){
    const toast = await this.toastController.create({
      message: 'You can login after payment',
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
      this.UNLogin();
      return;
    }
  });

    console.log("its working")
    this.collapse = false;
    this.prod.type=0
    this.ngOnInit();
    this.reset()
  }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    console.log("ng on")
    this.loadPayment();
    this. getPaymentmode();
    this.getPaymentbank();
  }



  typeSelected(){
  //   console.log(this.prod.type);
  //   if(this.prod.type=='20')
  // {
  //   this.collapse = true;
  // }
  //   else{
  //     this.collapse = false;
  //   }
  }
  getPaymentbank() {
    // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
       this.api.getdata('LOVs?filter[where][lovtype]=bank'+'&filter[where][deleted]<>255').subscribe((res: any) => {
         this.banks = res;
        // this.meta = res.meta;
         console.log(res);
    
        }, error1 => {
          console.log('Class: , Line:  error1 ', error1);
      });
    }
  getPaymentmode() {
    // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
       this.api.getdata('LOVs?filter[where][lovtype]=Payment'+'&filter[where][deleted]<>255').subscribe((res: any) => {
         this.types = res;
        // this.meta = res.meta;
         console.log(this.types);
    
        }, error1 => {
          console.log('Class: , Line:  error1 ', error1);
      });
    }



    validatbank(value){
      if(value === "default"){
       this.bankError=true;
      }else{
        this.bankError=false;
      }
    }
  validateunit(value){
    if(value === "0"){
     this.typeError=true;
    }else{
      this.typeError=false;
    }
  }

  reset(){
   // this.prod.type=0;
    this.prod.cardType=0;
    this.prod.branch=null;
    this.prod.cardno= null;
    this.prod.cvvno= null;
    this.prod.remarks = null;
  }



  selectChange() {
    this.reset();

    this.selectedValue = this.api.getDropDownText( this.prod.type, this.types)[0].id;
    console.log(this.prod.type);

    this.typename = this.types.find(x => x.id === this.selectedValue).listitem;
    console.log('nnn'+this.typename) ; 

    if( this.selectedValue=='20')
  {
    this.collapse = true;
  }
    else{
      this.collapse = false;
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

// onChange(){ 
//   // if( this.types)
//   this.typename = this.types.find(x => x.id === this.selectedValue).listitem;
//  console.log('nnn'+this.typename) ; 
//   }


  async InsertPyment() { 

       if(this.prod.type==0)
        {
          this.warning("Select a payment method")
          return;
        }

        if(this.prod.type==20 && (!this.prod.bank || this.prod.cardType==0))
        {
          this.warning("Select a bank or cardtype")
          return;
        }

    const data = {
      'data': { 'record': this.loadAmounts,
        'type': this.typename,//this.prod.type,
        'bank': this.prod.bank,
        'branch':this.prod.branch,
        'cardno': this.prod.cardno,
        'cvvno': this.prod.cvvno,
        'remarks':this.prod.remarks,
       'username':localStorage.getItem('use'),
       'CompanyID':localStorage.getItem('com'),
       'cardType':this.prod.cardType,

      }};
    console.log(data);
   

    await  this.api.patchdata('order/userInsertUpdatePayment', data).subscribe(async (res: any) => {
      console.log(res);

      if(res.data.length > 0)
             { 
              this.warning("Payment Successfull");
                this.routes.navigateByUrl('/category');
             }
             else {
              this.warning("Payment Not Successfull");
               //this.api.showSuccessToast('Login faild');
               this.routes.navigateByUrl('/userpayment');
         
             }

    });
   
  }

}
