import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';


export class localBazzar {
  locID: any;
  user_mobile: any;
  productName: any;
  price: any;
  productImage:any;
  contactNo:any;
 
                      }
@Component({
  selector: 'app-local-bazzar',
  templateUrl: './local-bazzar.page.html',
  styleUrls: ['./local-bazzar.page.scss'],
})
export class LocalBazzarPage implements OnInit {
  prod:any;
  today:any;
  master:any;
  response:any;
  Bazzars:any;

  imageUrl:string="../../../../assets/upimg/images.png";
  collapse = false;
  fileToUpload :File =null;
  file: any;

  page = 1;
  pageSize =50;
  items = [];
  editId:any;
  Imageserial:any;
  call : boolean=false;
  checkORnot:any;
  threeitem:any;

  editor:any;
  
  constructor(public api: ApiService ,private route: ActivatedRoute,public toastController: ToastController,private routes: Router ) {
    this.prod = new localBazzar();
    this.today = Date.now()+6*3600*1000;
    this.master = {date:this.today,status:0};
    this.collapse = true;

    this.route.params.subscribe(params => {
      if (params.id) {
        this.editId = params.id;
        this.dataOnEdit(this.editId);
      }
    });
    this.checkORnot={};
   }

  
   dataOnEdit(id: number) {
    this.items = [];
    this.collapse = false; 
    this.api.getdata('localBazzars/' + id).subscribe((res: any) => {
      // this.tableData = res;
      
      // this.api.getdata(res.productImage).subscribe((res)=>{
      //   console.log(res)
      //   console.log("res");
      // })
      this.prod = res;
      //this.file= res.productImage
      
     
    });
  }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
  
    this.call= true
    this.collapse = true;
    this.fileToUpload =null;
    this.get();
    //this.loadImageSerial();
    console.log("this.file")
    console.log(this.file)
  }
  async success(massage:any){
  const toast = await this.toastController.create({
    message: massage,
    duration: 2000,
    animated:false, 
    position:'middle', 
    //color:'secondary',
    });  
  toast.present();
  toast.onDidDismiss().then((val)=>{
console.log('toast Dismissed !')
  });
}

reset(){
  this.fileToUpload =null
  this.prod.productName=null;
  this.prod.price=null;
  this.prod.productImage='';
  this.prod.contactNo=null;
  setTimeout(() => {
    this.get();
  }, 1000);
 
 // this.loadImageSerial();
 this.routes.navigateByUrl('/local-bazzar');
}
checkthreeitem(){

}

 async patch() { 
   
  if(this.editId)
  {
    this.api.getdata('localBazzars/getlocalerialedit?locID=' + this.editId).subscribe((res: any) => {
      this.Imageserial = res;
      console.log(res);
    }, err => {
      console.log('err', this.Imageserial);
    });
  }
  else{
  this.api.getdata('localBazzars/getlocalerial').subscribe((res: any) => {
    this.Imageserial = res;
    console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}

  //newton add image siral end
  await   this.api.getdata('localBazzars/getthree?user_mobile=' + localStorage.getItem('use')).subscribe((res: any) => {
    this.threeitem = res;    
     console.log(this.threeitem);
     if(!this.editId && this.threeitem[0].locid>=3){
     this.success('Delete one item after add item');
     return;
    } 
    else
    {
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
        return;
      }    
      
      else{

        console.log(this.file)
  
        if(this.file){
      

          const file = this.file; 

          const folder = 'localbazzar';   
          // console.log(file);
          //console.log(localStorage.getItem('use'));
          const imagename=  this.Imageserial[0].sl+".jpg"
          console.log(imagename);  
               this.api.uploadFile(folder, file,imagename).subscribe(res => {          
                this.prod.productImage = 'fileuploads/' + folder + '/download/' + imagename;
          
          this.prod.user_mobile=localStorage.getItem('use') ;
          this.prod.productName=this.prod.productName;
            this.prod.price=this.prod.price;
            this.prod.productImage=this.prod.productImage;
            this.prod.contactNo=this.prod.contactNo;   
              this.prod.date=this.master.date, this.prod.status=this.master.status;
              console.log(this.prod);
              this.api.patchdata('localBazzars', this.prod).subscribe( (res: any)=>{
                this.response = res;
                       if(this.response) 
                  {
                    this.success('Your dada have been saved.');
                   this.imageUrl="../../../../assets/upimg/images.png";
                    this.reset();
                    
                    this.collapse = false; 
                }else{
                  this.success('Your dada have been Not saved.');
                  this.collapse = true; 
                }
              });            
            })
        }
        else
        {
          if(!this.editId && !this.file){
            this.success('Please select Image file');  
            return;
            }

          this.prod.user_mobile=localStorage.getItem('use') ;
          this.prod.productName=this.prod.productName;
            this.prod.price=this.prod.price;
            this.prod.productImage=this.prod.productImage;
            this.prod.contactNo=this.prod.contactNo;   
              this.prod.date=this.master.date, this.prod.status=this.master.status;
              console.log(this.prod);
              this.api.patchdata('localBazzars', this.prod).subscribe( (res: any)=>{
                this.response = res;
                       if(this.response) 
                  {
                    this.success('Your dada have been saved.');
                    this.reset();
                    this.collapse = false; 
                }else{
                  this.success('Your dada have been Not saved.');
                  this.collapse = true; 
                }

              });
        }
  }
  });
    }


  })



  }
  
  get() {    

    this.items=[]
    this.api.getdata('localBazzars?filter[where][user_mobile]=' + localStorage.getItem('use') +'&filter[limit]=4&filter[where][status]<>255&filter[order]=locID DESC').subscribe((res: any) => {
        this.Bazzars = res;    
        // console.log(res);

        if(this.Bazzars.length>0){
          this.collapse = false;
              //  for pagination start
         this.Bazzars.forEach(item => {      
          this.items.push(item);         
        });
       //  for pagination end 
        }else{
        this.collapse = true;
        }
          
    
    }, error1 => {
        console.log('Class: , Line:  error1 ', error1);
    });
}

loadImageSerial(){
  if(this.editId)
  {
    this.api.getdata('localBazzars/getlocalerialedit?locID=' + this.editId).subscribe((res: any) => {
      this.Imageserial = res;
      console.log(res);
    }, err => {
      console.log('err', this.Imageserial);
    });
  }
  else{
  this.api.getdata('localBazzars/getlocalerial').subscribe((res: any) => {
    this.Imageserial = res;
    console.log(res);
  }, err => {
    console.log('err', this.Imageserial);
  });
}
}


fileChanged(e) {
  this.file = e.target.files[0];
  //console.log(this.file)
}

uploadFilenewton(files: FileList) {
  this.collapse = true;
  console.log('image');

  this.fileToUpload = files.item(0);
var reader =new FileReader();
reader.onload=(event:any)=>{
  this.imageUrl =event.target.result;
}
reader.readAsDataURL(this.fileToUpload)
 
}

ionViewWillEnter()
 {  
  if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
    return;
  }
// console.log("this.editId") 
// console.log(this.editId)

// console.log(this.login)

  if(this.editId)
  {
    this.api.getdata('localBazzars/chackeditor?locID=' + this.editId).subscribe((res: any) => {
      this.editor = res;
    //   console.log( this.editor)
    //       console.log(this.editor[0].user_mobile) 
    // console.log(localStorage.getItem('use'))
     if(this.editor[0].user_mobile != localStorage.getItem('use')){
      this.usercheck("Please login");
     }
    //  console.log("this.editor[0].user_mobile ") 
    //  console.log(localStorage.getItem('use'))
    //   console.log( this.editor);
    }, err => {
      console.log('err', this.editor);
    });
  }


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
    this.collapse = true;
    this.fileToUpload =null;
    this.get();
    this.loadImageSerial();
    }

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


deleteItem(index)
    {
      this.api.deletedata('localBazzars',this.Bazzars[index].locID).subscribe((rsq: any) => {
       console.log(rsq);
       if(rsq.count=1){
        this.success('Item delete')
        this.reset();
        this.collapse = false; 
       }
      })

    }
}
