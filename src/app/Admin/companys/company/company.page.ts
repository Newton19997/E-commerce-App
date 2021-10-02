import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

export class Company {
  companyid: any;
  companyname: any;
  address: any;
  mobileNo: any;
  Description:any;
                      }

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  prod: any;
  response: any;
  companys: any;
  master:any;
  today: number;

  page = 1;
  pageSize =50;
  items = [];
 seachCompany: any;
  searchcom:any;
  comid:any;
  userset:any;
  checkORnot:any;
  constructor(public api: ApiService ,private route: ActivatedRoute,public toastController: ToastController,private routes: Router ) {
    this.prod = new Company();
    this.today = Date.now()+6*3600*1000;
    this.master = {createDate: this.today,statusID:0};

    //for edit
this.route.params.subscribe( param => {
  if (param.id) {
    this.comid=param.id;
    this.getProduct(param.id);
  }
});

//for user set
this.userset = {};
this.checkORnot={};
   }

   getProduct(id) {
    this.api.getdata('comp/' + id).subscribe(res => {
      this.prod = res;
    }, err => {
      console.log('err ', this.prod);

    });
  }


  
SearchCompany() { 
  this.items=[];
  //this.seachCompany=[];
  let link = `comp/getseachCompany?`;
  if ( this.searchcom) link += '&compname=' + encodeURIComponent(this.searchcom);
  this.api.getdata(link).subscribe((res: any) => {
    // this.api.getdata('comp/getseachCompany?compname=' + this.searchcom).subscribe((res: any) => {
    this.seachCompany = res;

    // console.log(' ser m'+JSON.stringify(res));
    // console.log(' ser'+ this.seachCompany);
    //this.seachCompany = JSON.stringify(res);
    // console.log(' ser'+ this.seachCompany);
     //  for pagination start
    //  this.seachCompany.forEach(COM=> {      
    //    this.items.push(COM); 
    // }); 

    for (var i = 0; i < this.seachCompany.length; i++)
       { 
      this.items.push(this.seachCompany[i]);
      }

    });
   //  for pagination end
   console.log( 'itema'+ this.items);
  };

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.get();
  }

   patch(userForm: NgForm) {
    if (!userForm.valid) {
      this.api.showWarningToast('Warning', 'please fill required fields first.');
      return;
    }
    this.prod.createDate=this.master.createDate, this.prod.statusID=this.master.statusID;
    console.log(this.prod);
    this.api.patchdata('comp', this.prod).subscribe( async res => {
      this.response = res;
      this.get();
//for massage
       if(this.response) 
        {
        const toast = await this.toastController.create({
          message: 'Your dada have been saved.',
          duration: 2000,
          animated:false, 
          position:'top', 
          //color:'secondary',
          });  
        toast.present();
        toast.onDidDismiss().then((val)=>{
      console.log('toast Dismissed !')
        });
      }
     // this.api.showSuccessToast('Success', this.response.message);
     //for massage end
      userForm.resetForm();
      this.routes.navigateByUrl('/company');
    }, async err => {
      //for massage
     
      const toast = await this.toastController.create({
        message: 'Your dada have been not saved.',
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
     // console.log(err);
    });
   
  }

///////for delete///////
deleteCompany() {
  const data = {
    'data': {
     // record: this.selectedCards,
      'COMID': this.comid,
    }
  };
  console.log(data);
  this.api.patchdata('comp/delectcompany', data).subscribe( async(res: any) => {
    console.log(res);
    this.comid=null;
    this.get();
    const toast = await this.toastController.create({
      message: 'Your dada have been Deleted.',
      duration: 2000,
      animated:false, 
      position:'top', 
      color:'warning',
      });  
    toast.present();
    toast.onDidDismiss().then((val)=>{
  console.log('toast Dismissed !')
    });
    this.routes.navigateByUrl('/company');
   // this.SearchCompany();

  });
}



/*
async  deleteCompany(userForm: NgForm){
  await  this.api.patchdata('comp/delectcompany', {data:[this.comid]}).subscribe(async (res: any) => {
    console.log('lodd'+ res);
    this.get();
    if(res.length > 0)
    {
      const toast = await this.toastController.create({
        message: 'Your dada have been Deleted.',
        duration: 2000,
        animated:false, 
        position:'top', 
        color:'warning',
        });  
      toast.present();
      toast.onDidDismiss().then((val)=>{
    console.log('toast Dismissed !')
      });
    }
           else {
             //this.api.showSuccessToast('Login faild');
       
           }
           this.routes.navigateByUrl('/company');
          

  });
  
}
*/
/////end delete///////



  

  get() {    
    this.api.getdata('comp?filter[limit]=50&filter[where][statusID]<>255&filter[order]=companyid DESC').subscribe((res: any) => {
        this.companys = res;    
        // console.log(res);
         //  for pagination start
         this.companys.forEach(item => {      
          this.items.push(item);         
        });
       //  for pagination end      
    
    }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
    });
}

async setmass(mas:any){
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

Setuser() {
  try {
    this.userset.uname=this.prod.companyname;
    this.userset.password='123';
    this.userset.CompanyID=parseInt(this.comid);
    this.userset.statusID=0;
    this.userset.mobileNo=this.prod.mobileNo;
    
    this.api.postdata('UserIns/user_createforCompany', this.userset).subscribe(async(rsq: any) => {
    // console.log(rsq);
    // console.log(rsq.data[0].id)
    if(rsq.data.length > 0){
     this.set();
      this.setmass("Company wish user set successfull");
     // this.routes.navigateByUrl('/company');
    }
    else{
      this.setmass("Company wish user not set ");
    }
  });
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
  this.routes.navigateByUrl('/adlogin');
}

ionViewWillEnter()
{
  if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }
  if(localStorage.getItem('com')!="1"){
    this.routes.navigateByUrl('/login');
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

}
Deleteuser(){
  try {
    this.userset.uname='newton';
    this.userset.password='123';
    this.userset.CompanyID=parseInt(this.comid);
    this.userset.statusID=0;
    this.userset.mobileNo='01777';
    
    this.api.postdata('UserIns/user_DeleteforCompany', this.userset).subscribe(async(rsq: any) => {
     console.log(rsq);
    console.log(rsq.data[0].companyID)
    if(rsq.data[0].companyID > 0){
     this.set();
      this.setmass("Company wish user Delete successfull");
     // this.routes.navigateByUrl('/company');
    }
    else{
      this.setmass("Company wish user not Delete ");
    }
  });
} catch (error) {
 // this.api.showWarningToast('insert failed..' + error);
}
}
set(){
  console.log('set')
  this.prod.companyid=null;
  this.prod.companyname=null;
  this.prod.address=null;
  this.prod.mobileNo=null;
  this.prod.Description=null;
  this.routes.navigateByUrl('/company');
}
}


