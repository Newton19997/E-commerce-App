import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastController } from '@ionic/angular';
export class itemmaster{
  iid:any;
  iname:any;
  descripation: any;
  price: any;
  quantity: any; 
  image:any;
  cid: any;
  aquantity: any; 
  squantity: any;  
  image1:any;
  image2: any;
  CompanyID: any; 
  unit: any; 
  SizeID:any;
  cname:any;
  QtID:any;
  colorID:any;
  rate:any;
  
};
export class addqtyitems {
  cid:any;
  iid: any;
  CompanyID: any; 
  balanceQyt: any;  
  addQty:any;
}


@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  imageUrl:string="../../../../assets/upimg/images.png";
   fileToUpload1 :File =null;
  imageUrl2:string="../../../../assets/upimg/images.png";
  fileToUpload2 :File =null;
  imageUrl3:string="../../../../assets/upimg/images.png";
  fileToUpload3 :File =null;
  // catagoryError=true;
  // catagorys=['Rice','Man','Dress','cack']
  // topicError=true;
  // company=['My Company','Second Company'];


  prod: any;
  prods:any;
  item: any;
  companyError=true;
  catagoryError=true;
  unitError=true;
  sizeError=true;
  colorError=true;
  catagorys:any;
  units:any;
  colors:any;
  sizes:any;
  master:any;
  today: number;
  response: any;
  editId: any;
  btnName: any;

  page = 1;
  pageSize =7;
  items = [];

  Imageserial:any;
  collapse = false;
  collapse2 = false;
  collapse3 = false;

  show:any;
  
  prod1: any;
  response1: any;
  del:any;
  call : boolean=false;
  checkORnot:any;
  constructor(public api: ApiService, public route: ActivatedRoute,public routes: Router,public toastController: ToastController) { 
                  this.prod = new itemmaster();
                  this.prod1 = new addqtyitems();
                  this.today = Date.now()+6*3600*1000;
                          this.master = {entrydate: this.today,statusID:0};

                          this.route.params.subscribe(params => {
                            if (params.id) {
                              this.editId = params.id;
                              this.dataOnEdit(this.editId);
                            }
                          });
                          this.btnName = this.editId ? 'Update' : 'Save';

                          this.collapse = true;
                          this.collapse2 = true;
                          this.collapse3 = true;
                          this.checkORnot={};
                }


                dataOnEdit(id) {
                  this.api.getdata('ItemMasters/getItem?iid=' + id).subscribe(res => {

                    console.log('iid'+ res);
                   // this.prod = res;
                   // console.log('iid', this.prod);
                   
                    this.collapse = false;
                    this.collapse2 = false;
                    this.collapse3 = false; 

                    this.prod.iid=res[0].iid;
                    this.prod.iname=res[0].iname;
                    this.prod.descripation=res[0].descripation;
                    this.prod.price=res[0].price;
                    this.prod.quantity=res[0].quantity; 
                    this.prod.image=res[0].image;
                    this.prod.cid=res[0].cid;
                    this.prod.aquantity=res[0].aquantity; 
                    this.prod.squantity=res[0].squantity; 
                    this.prod.image1=res[0].image1;
                    this.prod.image2=res[0].image2;
                    this.prod.CompanyID=res[0].CompanyID;
                    this.prod.unit=res[0].unit;
                    this.prod.SizeID=res[0].SizeID;
                    this.prod.cname=res[0].cname;
                    this.prod.QtID=res[0].QtID;
                    this.prod.colorID=res[0].colorID;

                    this.show= res[0].cname;
                    this.prod.rate=res[0].rate;
                
                  }, err => {
                    console.log('err ', this.prod);
              
                  });
                }        
                
     catagoryChange(event: { component: IonicSelectableComponent,  value: any }) {   
    console.log('Catagory:', event.value);
    this.prod.cid=event.value.cid;
   // this.show= event.value.listitem;
   this.show= event.value.cname;
 // this.show=''
   
  }

   validatecatagory(value){
    if(value === "default"){
      this.catagoryError=true;
    }else{
      this.catagoryError=false;
    }
  }
  
  validatecolor(value){
    if(value === "default"){
     this.colorError=true;
    }else{
      this.colorError=false;
    }
  }
  validatecompany(value){
    if(value === "default"){
     this.companyError=true;
    }else{
      this.companyError=false;
    }
  }
  validateunit(value){
    if(value === "35"){
     this.unitError=true;
    }else{
      this.unitError=false;
    }
  }

  validatesize(value){
    if(value === "34"){
     this.sizeError=true;
    }else{
      this.sizeError=false;
    }
  }
/*
  handleFileInput(file: FileList) {
    this.fileToUpload1 = file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl1=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload1);   
  }

  handleFileInput2(file: FileList) {
    this.fileToUpload2 = file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl2=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload2);   
  }

  handleFileInput3(file: FileList) {
    this.fileToUpload3 = file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl3=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload3);   
  }
*/

uploadFilenewton1(files: FileList) {

  //add serial newton
if(this.editId)
{
  this.api.getdata('ItemMasters/getCompanywiseImageserialedit?comid=' + localStorage.getItem('com') + '&cid=' + this.editId).subscribe((res: any) => {
    this.Imageserial = res;
    console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}
else{
// this.api.getdata('ProductCategories/getCompanywiseImageserial?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
  this.api.getdata('ItemMasters/getCompanywiseImageserial').subscribe((res: any) => {
  this.Imageserial = res;
  console.log(res);
}, err => {
  console.log('err', this.Imageserial);
});
}

//newton end

  this.collapse=true;
  this.prod.Cimage='';

    const file = files.item(0);  
    const folder = 'itemImage1';
   // console.log(this.Imageserial.sl);
    const imagename=  this.Imageserial[0].sl+".jpg"
    console.log(imagename);

    //console.log(file);
  
    // this.api.uploadFilenewton(folder, file).subscribe(res => {
    //  this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
       this.api.uploadFile(folder, file,imagename).subscribe(res => {          
     this.prod.image = 'fileuploads/' + folder + '/download/' + imagename;
    // this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
   // console.log('imgesss '+this.prod.Cimage);
    }, err => {
      console.log(err);
    });
  }

  uploadFilenewton(files: FileList) {
    this.fileToUpload1 = files.item(0);
  var reader =new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl =event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload1)
   
  }



  
uploadFilenewton2(files: FileList) {

//add serial newton
if(this.editId)
  {
    this.api.getdata('ItemMasters/getCompanywiseImageserialedit?comid=' + localStorage.getItem('com') + '&cid=' + this.editId).subscribe((res: any) => {
      this.Imageserial = res;
      console.log(res);
    }, err => {
      console.log('err', this.Imageserial);
    });
  }
  else{
  // this.api.getdata('ProductCategories/getCompanywiseImageserial?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
    this.api.getdata('ItemMasters/getCompanywiseImageserial').subscribe((res: any) => {
    this.Imageserial = res;
    console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}

//newton end

  this.collapse2=true;
  this.prod.Cimage='';

    const file = files.item(0);  
    const folder = 'itemImage2';
   // console.log(this.Imageserial.sl);
    const imagename=  this.Imageserial[0].sl+".jpg"
    console.log(imagename);
    //console.log(file);  
    // this.api.uploadFilenewton(folder, file).subscribe(res => {
    //  this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
       this.api.uploadFile(folder, file,imagename).subscribe(res => {          
     this.prod.image1 = 'fileuploads/' + folder + '/download/' + imagename;
    // this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
   // console.log('imgesss '+this.prod.Cimage);
    }, err => {
      console.log(err);
    });
  }

  uploadFilenewtontow(files: FileList) {
    this.fileToUpload2 = files.item(0);
  var reader =new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl2 =event.target.result;  }
  reader.readAsDataURL(this.fileToUpload2)
   
  }

 
  uploadFilenewton3(files: FileList) {
//add serial newton
if(this.editId)
  {
    this.api.getdata('ItemMasters/getCompanywiseImageserialedit?comid=' + localStorage.getItem('com') + '&cid=' + this.editId).subscribe((res: any) => {
      this.Imageserial = res;
      console.log(res);
    }, err => {
      console.log('err', this.Imageserial);
    });
  }
  else{
  // this.api.getdata('ProductCategories/getCompanywiseImageserial?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
    this.api.getdata('ItemMasters/getCompanywiseImageserial').subscribe((res: any) => {
    this.Imageserial = res;
    console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}

//newton end

    this.collapse3=true;
    this.prod.Cimage='';
  
      const file = files.item(0);  
      const folder = 'itemImage3';
     // console.log(this.Imageserial.sl);
      const imagename=  this.Imageserial[0].sl+".jpg"
      console.log(imagename);
  
      //console.log(file);
    
      // this.api.uploadFilenewton(folder, file).subscribe(res => {
      //  this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
         this.api.uploadFile(folder, file,imagename).subscribe(res => {          
       this.prod.image2 = 'fileuploads/' + folder + '/download/' + imagename;
      // this.prod.Cimage = 'fileuploads/' + folder + '/download/' + file.name;
     // console.log('imgesss '+this.prod.Cimage);
      }, err => {
        console.log(err);
      });
    }
  
    uploadFilenewtonthree(files: FileList) {
      this.fileToUpload3 = files.item(0);
    var reader =new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl3 =event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload3)
     
    }

/*
  uploadFile1(files: FileList) {
    const file = files.item(0);  
    const folder = 'itemImage1';
    console.log(file);
    // this.api.uploadFile(folder, file,"id").subscribe(res => {
    this.api.uploadFile(folder, file).subscribe(res => {
      this.prod.image = 'fileuploads/' + folder + '/download/' + file.name;

    }, err => {
      console.log(err);
    });
  }

  uploadFile2(files: FileList) {
    const file = files.item(0);  
    const folder = 'itemImage2';
    console.log(file);
    // this.api.uploadFile(folder, file,"id").subscribe(res => {
    this.api.uploadFile(folder, file).subscribe(res => {
      this.prod.image1 = 'fileuploads/' + folder + '/download/' + file.name;

    }, err => {
      console.log(err);
    });
  }
 
  uploadFile3(files: FileList) {
    const file = files.item(0);  
    const folder = 'itemImage3';
    console.log(file);
    // this.api.uploadFile(folder, file,"id").subscribe(res => {
    this.api.uploadFile(folder, file).subscribe(res => {
      this.prod.image2 = 'fileuploads/' + folder + '/download/' + file.name;

    }, err => {
      console.log(err);
    });
  }
 */

loadImageSerial(){
  if(this.editId)
  {
    this.api.getdata('ItemMasters/getCompanywiseImageserialedit?comid=' + localStorage.getItem('com') + '&cid=' + this.editId).subscribe((res: any) => {
      this.Imageserial = res;
      console.log(res);
    }, err => {
      console.log('err', this.Imageserial);
    });
  }
  else{
  // this.api.getdata('ProductCategories/getCompanywiseImageserial?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
    this.api.getdata('ItemMasters/getCompanywiseImageserial').subscribe((res: any) => {
    this.Imageserial = res;
    console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}
}


  ngOnInit() {

   // console.log('sdfs'+localStorage.getItem('com'));
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
     this.call= true;
     this.fileToUpload1 =null;
    this.fileToUpload2 =null;
    this.fileToUpload3 =null;
    
    this.prod.image='';
    this.prod.image1='';
    this.prod.image2=''; 
    console.log('c '+ this.prod.colorID)

    this.loadCompany();
    this.getCategories();
    this.getunit();
    this.loadImageSerial();
    this.getsize();
    this.getcolor();
    
  //  this.prod.SizeID=12;
  }
  
  loadCompany(){
    this.api.getdata('ProductCategories/getCompany?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.prods = res;
      console.log(res);
      this.prod.CompanyID=this.prods[0].CampanyID;
    }, err => {
      console.log('err', this.prod);
    });
  }

  getCategories() {
    // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
       this.api.getdata('ProductCategories?filter[where][CampanyID]=' + localStorage.getItem('com') +'&filter[where][statusID]<>255' +'&filter[order]=cid DESC').subscribe((res: any) => {
         this.catagorys = res;
        // this.meta = res.meta;
         console.log(res);
    
        }, error1 => {
          console.log('Class: , Line:  error1 ', error1);
      });
    }

    getunit() {
      // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
         this.api.getdata('LOVs?filter[where][lovtype]=unit'+'&filter[where][deleted]<>255'+'&filter[order]=listsequence asc').subscribe((res: any) => {
           this.units = res;
          // this.meta = res.meta;
           console.log(res);
           if(!this.editId)
           this.prod.unit=this.units[0].id;
      
          }, error1 => {
            console.log('Class: , Line:  error1 ', error1);
        });
      }

      getcolor(){
        // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
           this.api.getdata('LOVs?filter[where][lovtype]=color'+'&filter[where][deleted]<>255'+'&filter[order]=listsequence asc').subscribe((res: any) => {
             this.colors = res;
            // this.meta = res.meta;
             console.log(res);
             if(!this.editId)
             this.prod.colorID=this.colors[0].id;
        
            }, error1 => {
              console.log('Class: , Line:  error1 ', error1);
          });
        }
      getsize() {
        // this.api.getdata('ProductCategories?filter[order]=cid DESC').subscribe((res: any) => {
           this.api.getdata('LOVs?filter[where][lovtype]=productSize'+'&filter[where][deleted]<>255'+'&filter[order]=listsequence asc').subscribe((res: any) => {
             this.sizes = res;
            // this.meta = res.meta;
             console.log(res);
             if(!this.editId)
             this.prod.SizeID=this.sizes[0].id;
        
            }, error1 => {
              console.log('Class: , Line:  error1 ', error1);
          });
        }

  
        async Save(){
          //for massage
          const toast = await this.toastController.create({
           message: 'Item Save Successfully.',
           duration: 2000,
           animated:false, 
           position:'middle', 
           color:'warning',
           });  
         toast.present();
         toast.onDidDismiss().then((val)=>{
         console.log('toast Dismissed !')
         });
         //for massage end
           } 
    
           async Editmas(){
            //for massage
            const toast = await this.toastController.create({
             message: 'Item Edit Successfully.',
             duration: 2000,
             animated:false, 
             position:'middle', 
             color:'warning',
             });  
           toast.present();
           toast.onDidDismiss().then((val)=>{
           console.log('toast Dismissed !')
           });
           //for massage end
             } 
             async Deleted(){
              //for massage
              const toast = await this.toastController.create({
               message: 'Item Deleted Successfully.',
               duration: 2000,
               animated:false, 
               position:'middle', 
               color:'warning',
               });  
             toast.present();
             toast.onDidDismiss().then((val)=>{
             console.log('toast Dismissed !')
             });
             //for massage end
               } 
          
  async checkimage1(){
    //for massage
    const toast = await this.toastController.create({
     message: 'please select Item Image 1.',
     duration: 2000,
     animated:false, 
     position:'middle', 
     color:'warning',
     });  
   toast.present();
   toast.onDidDismiss().then((val)=>{
   console.log('toast Dismissed !')
   });
   //for massage end
     } 
     async checkimage2(){
      //for massage
      const toast = await this.toastController.create({
       message: 'please select Item Image 2.',
       duration: 2000,
       animated:false, 
       position:'middle', 
       color:'warning',
       });  
     toast.present();
     toast.onDidDismiss().then((val)=>{
     console.log('toast Dismissed !')
     });
     //for massage end
       } 
       async checkimage3(){
        //for massage
        const toast = await this.toastController.create({
         message: 'please select Item Image 3.',
         duration: 2000,
         animated:false, 
         position:'middle', 
         color:'warning',
         });  
       toast.present();
       toast.onDidDismiss().then((val)=>{
       console.log('toast Dismissed !')
       });
       //for massage end
         } 
         async checkColor(){
          //for massage
          const toast = await this.toastController.create({
           message: 'please select Item Color.',
           duration: 2000,
           animated:false, 
           position:'middle', 
           color:'warning',
           });  
         toast.present();
         toast.onDidDismiss().then((val)=>{
         console.log('toast Dismissed !')
         });
         //for massage end
           } 

           async checkSize(){
            //for massage
            const toast = await this.toastController.create({
             message: 'please select Item Size.',
             duration: 2000,
             animated:false, 
             position:'middle', 
             color:'warning',
             });  
           toast.present();
           toast.onDidDismiss().then((val)=>{
           console.log('toast Dismissed !')
           });
           //for massage end
             } 

             async checkUnit(){
              //for massage
              const toast = await this.toastController.create({
               message: 'please select Item Unit.',
               duration: 2000,
               animated:false, 
               position:'middle', 
               color:'warning',
               });  
             toast.present();
             toast.onDidDismiss().then((val)=>{
             console.log('toast Dismissed !')
             });
             //for massage end
               } 

patch() { 
  if(!this.prod.image){
    this.checkimage1();
    return;
  }
  if(!this.prod.image1){
    this.checkimage2();
    return;
  }
  if(!this.prod.image2){
    this.checkimage3();
    return;
  }

  if(this.prod.colorID == 36){
    this.checkColor();
    return;
  }
  if(this.prod.SizeID == 34){
    this.checkSize();
    return;
  }
 
  if(this.prod.unit == 35){
    this.checkUnit();
    return;
  }

  this.prod.entrydate=this.master.entrydate, this.prod.statusID=this.master.statusID;
  this.prod.aquantity=this.prod.quantity;
  this.prod.squantity=0;
  this.prod.cid=this.prod.cid;

  this.prod1.entrydate=this.master.entrydate, this.prod1.statusID=this.master.statusID;
  this.prod1.cid=this.prod.cid;
  this.prod1.CompanyID=this.prod.CompanyID; 
  this.prod1.balanceQyt=this.prod.quantity ;  
  this.prod1.addQty=this.prod.quantity;
  this.prod1.rate=this.prod.rate;
  this.prod1.price=this.prod.price;

  console.log(this.prod);
  this.api.postdata('ItemMasters', this.prod).subscribe((res: any) =>{
    this.response = res;
  //  console.log(res);
   this.prod1.iid=res.iid ; 
   //this.prod1.cid=res.cid;
   // console.log('iid '+ this.prod1.iid)
    this.api.postdata('itemadds', this.prod1).subscribe(res1 => {
      this.response1 = res1; 
    this.setpage();
    this.Save();
    },
      err => {
        // this.api.showFailureToast('Error', err.message);
         console.log(err);
       });
   // this.added.emit(true);
  }, err => {
   // this.api.showFailureToast('Error', err.message);
    console.log(err);
  });
 // this.get();
}


setpage(){ 

  console.log('u '+ this.prod.unit)
  console.log('s '+ this.prod.SizeID)
  console.log('c '+ this.prod.colorID)
  console.log('i1 '+this.prod.image)
  console.log('i2 '+this.prod.image1)
  console.log('i3 '+this.prod.image2)
  
  this.fileToUpload1 =null;
  this.fileToUpload2 =null;
  this.fileToUpload3 =null; 
  this.collapse = false;
  this.collapse2 = false;
  this.collapse3 = false; 
  this.loadImageSerial(); 
  this.prod.iname='';
  this.prod.descripation='';
  this.prod.price='';
  this.prod.quantity=''; 
  this.prod.image='';
  this.prod.image1='';
  this.prod.image2=''; 
  this.prod.cid=''; 
  this.prod.rate='';
  this.prod.unit=this.units[0].id;  
  this.prod.SizeID=this.sizes[0].id; 
  this.prod.colorID=this.colors[0].id; 
  this.routes.navigateByUrl('/additem');
  this.getCategories();

  this.prod.cid ='';
  this.prod.cid =null;

}

Edit() { 

  if(!this.prod.image){
    this.checkimage1();
    return;
  }
  if(!this.prod.image1){
    this.checkimage2();
    return;
  }
  if(!this.prod.image2){
    this.checkimage3();
    return;
  }

  if(this.prod.colorID == 36){
    this.checkColor();
    return;
  }
  if(this.prod.SizeID == 34){
    this.checkSize();
    return;
  }
 
  if(this.prod.unit == 35){
    this.checkUnit();
    return;
  }
  
  this.prod.entrydate=this.master.entrydate, this.prod.statusID=this.master.statusID;
  this.prod.aquantity= this.prod.quantity;
  this.prod.squantity=0;
  this.prod.cid=this.prod.cid;

  this.prod1.entrydate=this.master.entrydate, this.prod1.statusID=this.master.statusID;
  this.prod1.cid=this.prod.cid;
  this.prod1.CompanyID=this.prod.CompanyID; 
  this.prod1.balanceQyt=this.prod.quantity ;  
  this.prod1.addQty=this.prod.quantity;
  this.prod1.rate=this.prod.rate;
  this.prod1.price=this.prod.price;

  this.prod1.QtID=this.prod.QtID;

  console.log(this.prod);
  this.api.patchdata('ItemMasters', this.prod).subscribe((res: any) =>{
    this.response = res;
  //  console.log(res);
   this.prod1.iid=res.iid ; 
   //this.prod1.cid=res.cid;
   // console.log('iid '+ this.prod1.iid)
    this.api.patchdata('itemadds', this.prod1).subscribe(res1 => {
      this.response1 = res1; 
    this.setpage();
    this.Editmas() },
      err => {
        // this.api.showFailureToast('Error', err.message);
         console.log(err);
       });
   // this.added.emit(true);
  }, err => {
   // this.api.showFailureToast('Error', err.message);
    console.log(err);
  });
 // this.get();
}

deleteItem(){
  if(this.editId)
  {
    this.api.getdata('ItemMasters/Deleteitem?comid=' + localStorage.getItem('com') + '&iid=' + this.editId + '&QtID=' + this.prod.QtID).subscribe((res: any) => {
      this.del = res;
      this.Deleted();
      this.setpage();
    //  this.routes.navigateByUrl('/itemdetails');
      console.log(res);
    }, err => {
      console.log('err', this.del);
    });
  }
}


ionViewDidLeave()
{
  this.call= false;
}


ionViewWillEnter()
{
  this.prod.cid ='';
  // if(!this.call)
  // //      {
  
  // //      }
if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
  return;
}
console.log("rsq");
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
