import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';


export class catagory {
                        cid:any;
                        cname: any;
                        CampanyID: any; 
                        Cimage: any; 
                        imgserial:any; 
                      }

@Component({
  selector: 'app-addcatagory',
  templateUrl: './addcatagory.page.html',
  styleUrls: ['./addcatagory.page.scss'],
})
export class AddcatagoryPage implements OnInit {
  imageUrl:string="../../../../assets/upimg/images.png";
  fileToUpload :File =null;
  prod: any;
  prods:any;
  item: any;
  companyError=true;
  master:any;
  today: number;
  response: any;
  editId: any;
  btnName: any;

  page = 1;
  pageSize =10;
  items = [];
  // topicError=true;
  // company=['My Company','Second Company'];
  Imageserial:any;
  @Output() added = new EventEmitter();
  collapse = false;
  searchcom:any;
  seachCompany: any;
  call : boolean=false;
  checkORnot:any;
  constructor(public api: ApiService, private route: ActivatedRoute,private routes: Router,public toastController: ToastController,)
                        { 
                          this.prod = new catagory();
                          this.today = Date.now()+6*3600*1000;
                          this.master = {datetime: this.today,statusID:0};

                          this.route.params.subscribe(params => {
                            if (params.id) {
                              this.editId = params.id;
                              this.dataOnEdit(this.editId);
                            }
                          });
                          this.btnName = this.editId ? 'Update' : 'Save';

                          this.collapse = true;

                          this.checkORnot={};
                        }
                       
  
   dataOnEdit(id: number) {
    this.items = [];
    this.api.getdata('ProductCategories/' + id).subscribe((res: any) => {
      // this.tableData = res;
      this.collapse = false; 
      this.prod = res;
      console.log(this.prod);
     
    });
  }
/*
  uploadFile(files: FileList) {
    const file = files.item(0);  
    const folder = 'catImage';
   // console.log(this.Imageserial.sl);
    const imagename=  this.Imageserial[0].sl+".jpg"
    console.log(imagename);
    //console.log(file);
  
    this.api.uploadFile(folder, file).subscribe(res => {
     this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
       // this.api.uploadFile(folder, file,imagename).subscribe(res => {
    //  this.prod.Cimage = 'fileuploads/' + folder + '/download/' + imagename;
    }, err => {
      console.log(err);
    });
  }
  */

 uploadFilenewton1(files: FileList) {
  this.collapse=true;
  this.prod.Cimage='';

    const file = files.item(0);  
    const folder = 'catImage';
   // console.log(this.Imageserial.sl);
    const imagename=  this.Imageserial[0].sl+".jpg"
    console.log(imagename);

    //console.log(file);
  
    // this.api.uploadFilenewton(folder, file).subscribe(res => {
    //  this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
       this.api.uploadFile(folder, file,imagename).subscribe(res => {          
     this.prod.Cimage = 'fileuploads/' + folder + '/download/' + imagename;
    // this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
   // console.log('imgesss '+this.prod.Cimage);
    }, err => {
      console.log(err);
    });
  }

  uploadFilenewton(files: FileList) {
    this.fileToUpload = files.item(0);
  var reader =new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl =event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload)
   
  }


  ngOnInit() {
    this.items = [];
 // console.log('sdfs'+localStorage.getItem('com'));
   if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
     return;
   }
    this.call= true;
   this.fileToUpload =null;
this.loadCompany();
this.get();
this.loadImageSerial();


  }

loadCompany(){
  this.api.getdata('ProductCategories/getCompany?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
    this.prods = res;
   // console.log(res);
    this.prod.CampanyID=this.prods[0].CampanyID;
  }, err => {
    console.log('err', this.prods);
  });
}

loadImageSerial(){
  if(this.editId)
  {
    this.api.getdata('ProductCategories/getCompanywiseImageserialedit?comid=' + localStorage.getItem('com') + '&cid=' + this.editId).subscribe((res: any) => {
      this.Imageserial = res;
     // console.log(res);
    }, err => {
      console.log('err', this.Imageserial);
    });
  }
  else{
  this.api.getdata('ProductCategories/getCompanywiseImageserial?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
    this.Imageserial = res;
   // console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}
}

  /*
  handleFileInput(files: FileList) {
    const file = files.item(0);
    const folder = 'employees';
    console.log(files.item(0));
    // const newfilename = files.item(0).name.replace(`${this.emp.EMP_CARD_NO.replace(/000+/, '')}.jpg`, ``)
    this.isImageLoading = true;
    this.api.uploadFile(folder, file).subscribe((res: any) => {
      this.imageToShow = 'fileuploads/' + folder +  '/download/' + file.name;
      // console.log("base64 :",this.empImage.base64);
    }, err => {
      console.log(err);
    });
  }
  */

  
  async checkimage(){
    //for massage
    const toast = await this.toastController.create({
     message: 'please select Category Image.',
     duration: 2000,
     animated:false, 
     position:'middle', 
     color:'warning',
     });  
   toast.present();
   toast.onDidDismiss().then((val)=>{
  // console.log('toast Dismissed !')
   });
   //for massage end
     } 
  
     async Save(){
      //for massage
      const toast = await this.toastController.create({
       message: 'Category Save Successfully.',
       duration: 2000,
       animated:false, 
       position:'middle', 
       color:'warning',
       });  
     toast.present();
     toast.onDidDismiss().then((val)=>{
    // console.log('toast Dismissed !')
     });
     //for massage end
       } 

       async Editmas(){
        //for massage
        const toast = await this.toastController.create({
         message: 'Category Edit Successfully.',
         duration: 2000,
         animated:false, 
         position:'middle', 
         color:'warning',
         });  
       toast.present();
       toast.onDidDismiss().then((val)=>{
      // console.log('toast Dismissed !')
       });
       //for massage end
         } 
         async Deleted(mew:any){
          //for massage
          const toast = await this.toastController.create({
           message:mew, 
           duration: 2000,
           animated:false, 
           position:'middle', 
           color:'warning',
           });  
         toast.present();
         toast.onDidDismiss().then((val)=>{
        // console.log('toast Dismissed !')
         });
         //for massage end
           } 

patch() {
if(!this.prod.Cimage){
  this.checkimage();
  return;
}

this.api.getdata('ProductCategories/getCompanywiseImageserial?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
  this.Imageserial = res;
 // console.log(res);


  this.prod.datetime=this.master.datetime, this.prod.statusID=this.master.statusID;
  this.prod.imgserial=this.Imageserial[0].sl;
 // console.log(this.prod);
  this.api.patchdata('ProductCategories', this.prod).subscribe(res => {
    this.response = res;
    this.Save();
    // this.fileToUpload =null; 
    this.fileToUpload=File =null;
    this.get(); 
    this.loadImageSerial();    
    this.collapse = false; 
    this.prod.cname='';
    this.prod.Cimage='';
    this.added.emit(true);
  }, err => {
   // this.api.showFailureToast('Error', err.message);
    console.log(err);
  });
});
 
}

Edit() {
  if(!this.prod.Cimage){
    this.checkimage();
    return;
  }

  this.api.getdata('ProductCategories/getCompanywiseImageserialedit?comid=' + localStorage.getItem('com') + '&cid=' + this.editId).subscribe((res: any) => {
    this.Imageserial = res;
   // console.log(res);
 

  this.prod.datetime=this.master.datetime, this.prod.statusID=this.master.statusID;
  this.prod.imgserial=this.Imageserial[0].sl;
  //console.log(this.prod);
  this.api.patchdata('ProductCategories', this.prod).subscribe(res => {
    this.response = res;
    this.Editmas();
    // this.fileToUpload =null; 
    this.fileToUpload=File =null;
    // setTimeout(()=>{
    //   this.get(); 
    // },200);
   
    this.loadImageSerial();    
    this.collapse = false; 
    this.prod.cname='';
    this.prod.Cimage='';
    this.editId='';
   this.routes.navigateByUrl('/addcatagory');
   setTimeout(()=>{
    this.get(); 
  },200);
    this.added.emit(true);
  }, err => {
   // this.api.showFailureToast('Error', err.message);
    console.log(err);
  });
});
 
}

setpage() {
  console.log(this.prod.Cimage);

  // this.prod.datetime=this.master.datetime, this.prod.statusID=this.master.statusID;
  // this.prod.imgserial=this.Imageserial[0].sl;
  // console.log(this.prod);
  // this.api.patchdata('ProductCategories', this.prod).subscribe(res => {
  //   this.response = res;
  //   // this.fileToUpload =null; 
    this.fileToUpload=File =null;
    this.get(); 
    this.loadImageSerial();    
    this.collapse = false; 
    this.prod.cname='';
    this.prod.Cimage='';
    this.editId='';
    this.routes.navigateByUrl('/addcatagory');
    this.added.emit(true);
  // }, err => {
  //  // this.api.showFailureToast('Error', err.message);
  //   console.log(err);
  // });
 
 
}


validatecompany(value){
  if(value === "default"){
   this.companyError=true;
  }else{
    this.companyError=false;
  }
}
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);   
  }

  get() {
    this.items = [];
   // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
      this.api.getdata('ProductCategories?filter[limit]=50&filter[where][CampanyID]=' + localStorage.getItem('com') +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
        this.item = res;  
      //  console.log("rfdgdes");
      //   console.log(res);
         //  for pagination start
         this.item.forEach(item => {      
          this.items.push(item);         
        });
       //  for pagination end   
    }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
    });
}

SearchCompany() { 
  this.items=[];

  let link = `ProductCategories/getseachitemname?`;
  if ( this.searchcom) link += '&itemname=' + encodeURIComponent(this.searchcom);
  //pflDesign if (this.fromDate) { link += '&fromdate=' + this.fromDate.toJSON(); }
  //   if (this.toDate) { link += '&todate=' + this.toDate.toJSON(); }
    if (localStorage.getItem('com')) { link += '&comid=' + localStorage.getItem('com'); }
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
  // console.log( 'itema'+ this.items);
  };
/*
  ///////for delete///////
deleteItem() {
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
*/
deleteItem() {
 if(this.editId){
  this.items = [];
  this.api.getdata('ProductCategories/getitemDelete?comid=' + localStorage.getItem('com')+ '&cid=' + this.editId).subscribe((res: any) => {
 // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
    // this.api.getdata('ProductCategories?filter[limit]=50&filter[where][CampanyID]=' + localStorage.getItem('com') +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
      this.item = res;     
     // this.meta = res.meta;
      console.log(res);
      if(this.item[0].dil==1){
        this.Deleted("Category not Deleted Successfully.");
      }
      else{
        this.Deleted('Category Deleted Successfully.');
      }
      this.collapse = false; 

       //  for pagination start
       this.item.forEach(item => {      
        this.items.push(item);         
      });
     //  for pagination end
    
     this.setpage();
    
    /*
//for massage
const toast = await this.toastController.create({
  message: 'Your dada have been Deleted.',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });  
toast.present();
this.items = [];
this.item.forEach(item => {      
  this.items.push(item);         
});
this.setpage();
toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
});
//for massage end
*/
  
  }, error1 => {
      console.log('Class: , Line:  error1 ', error1);
  });
}
}

// ionViewWillLeave(){
//   console.log('newee');
//   this.get();
// }

// ionViewWillEnter()
//   { 
//     if(!this.call)
//      {

//      }
    
   
//   }

  ionViewDidLeave()
  {
    this.call= false;
  }

  
ionViewWillEnter()
{
  if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }
  //console.log("rsq");
  this.items=[];
  setTimeout(()=>{
    this.get(); 
  },200);
  try {
   
    this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));   
    this.checkORnot.uname=localStorage.getItem('use');
    this.checkORnot.password=localStorage.getItem('pas');
   
    this.api.postdata('UserIns/check_companyadmin', this.checkORnot).subscribe((rsq: any) => {
     // console.log("rsrtyrq");
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
  this.routes.navigateByUrl('/adlogin');
}
}
