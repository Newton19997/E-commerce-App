import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

export class feedbackuser {
 // feimageid:any;
  userid_mobile: any;
  image: any; 
  statusid: any; 
 
}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  messages:Observable<any[]>;
  newMsg='';
  prod:any;
  imageUrl:string="../../../../assets/upimg/images.png";
  collapse = false;
  fileToUpload :File =null;
  file: any;
  labData:any;
  userImage:any;
  mobilNo:any;
  friend_OR_notFriend:any;
  prods:any;
  checkORnot:any;
  call : boolean=false;
  constructor(public api: ApiService,public routes: Router,public toastController: ToastController) {
    this.prod = new feedbackuser();
    this.collapse = true;
    this.prods = {};
    this.checkORnot={};
   }

  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    this.call= true;
    this.collapse = true;
    this.fileToUpload =null;
    //console.log('load ng on');
    this.loadimage();
    this.loadfriend_OR_notFriend();
  }

loadimage(){
 // console.log('load image');
 
  this.api.getdata('feedbacks/getImage?mobil=' + localStorage.getItem('use')).subscribe((res: any) => {
   
    this.userImage = res;
    console.log("this.userImage");
    console.log(this.userImage);
    if(this.userImage.length>0){
      this.collapse = false;
    }else{
    this.collapse = true;
    }
    
   // console.log(res);
  }, err => {
    console.log('err', this.userImage);
  });

}

loadfriend_OR_notFriend(){
  // // console.log('load image');
  //  this.collapse = false;
  //  this.api.getdata('feedbacks/loadfriend_OR_notFriend?mobil=' + localStorage.getItem('use')).subscribe((res: any) => {
  //    this.userImage = res;
  //    console.log(res);
  //  }, err => {
  //    console.log('err', this.userImage);
  //  });


   let link = `feedbacks/loadfriend_OR_notFriend?mobil=` + localStorage.getItem('use');
   if ( this.mobilNo) link += '&searchmobile=' + encodeURIComponent(this.mobilNo);   
   this.api.getdata(link).subscribe((res: any) => {    
     this.friend_OR_notFriend = res; 
     });
 
 }


  fileChanged(e) {
		this.file = e.target.files[0];
	}



  uploadFilenewton1(files: FileList) {
    this.collapse=true;
    this.prod.image='';
  
      const file = files.item(0);  
      const folder = 'UserImage';
     // console.log(this.Imageserial.sl);
      const imagename=  localStorage.getItem('use')+".jpg"
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
      this.collapse = true;
      console.log('image');

      this.fileToUpload = files.item(0);
    var reader =new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl =event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload)
     
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
      this.searchUserList();
      // this.routes.navigateByUrl('/login');
    }
    reset(){
      console.log("reset")
      this.fileToUpload =null
      this.prod.image=null;      
      this.prod.image='';     
      setTimeout(() => {
        this.loadimage();
      }, 100);
    }    
    uploadFile() {

      const file = this.file;  
      if(!file){
        this.warning('Please select Image file');  
          return;
      }
      const folder = 'UserImage';   
      console.log(file);
      console.log(localStorage.getItem('use'));
      const imagename=  localStorage.getItem('use')+".jpg"
      console.log(imagename);  
           this.api.uploadFile(folder, file,imagename).subscribe(res => {          
       this.prod.image = 'fileuploads/' + folder + '/download/' + imagename;
      
       this.prod.userid_mobile=localStorage.getItem('use') ;
       this.prod.image=this.prod.image ;
       this.prod.statusid=1;
       console.log(this.prod);
       //const link='WorkOrderDetails/WorkOrderWiseLabTest?WorkOrderID='+this.labData+ '&LabReport='+this.LabReport + '&CreatedBy='+sessionStorage.getItem('userid');
  
      // this.api.postdata('WorkOrderDetails/WorkOrderWiseLabTest',this.labData).subscribe((res: any) => {
       // ProductionFinisheds/updateFinishForPflPlanningforoffset
        const data = {
          'data': { 'record': [this.prod]           
           
          }};
        console.log(data);
        this.api.patchdata('feedbacks/Imageupload', data).subscribe( (res: any) => {
          console.log(res);
      
          this.warning('Image successfully'); 
          this.collapse = false; 
          this.imageUrl="../../../../assets/upimg/images.png";
        });
        this.reset();
      }, err => {
        console.log(err);
      });
    }
  
    searchUserList(){
      
   let link = `feedbacks/loadfriend_OR_notFriend?mobil=` + localStorage.getItem('use');
   if (this.mobilNo) link += '&searchmobile=' + encodeURIComponent(this.mobilNo);   
   this.api.getdata(link).subscribe((res: any) => {    
     this.friend_OR_notFriend = res; 
     console.log(this.friend_OR_notFriend);
     });
    }


    add(index) {
      try {
        this.prods.userid_mobile=localStorage.getItem('use');
        this.prods.linkid_mobile=this.friend_OR_notFriend[index].mobile;

      //  console.log(this.prods.linkid_mobile);
  
        this.api.postdata('feedbacks/addfriend_feedback', this.prods).subscribe((rsq: any) => {
        console.log(rsq);
       // console.log(rsq.data.length)
        if(rsq.data.length > 0){
          this.warning('your friend request send');         
        }
        else{
          this.warning('your friend request not send'); 
  
        }
      });
    } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    }
    }

    Confirm(index) {
      try {
        this.prods.userid_mobile=localStorage.getItem('use');
        this.prods.linkid_mobile=this.friend_OR_notFriend[index].mobile;
        
  
        this.api.postdata('feedbacks/confirmfriend_feedback', this.prods).subscribe((rsq: any) => {
        console.log(rsq);
        // console.log(rsq.data[0].id)
        if(rsq.data.length > 0){
          this.warning('except your friend request '); 
         
  
        }
        else{
          this.warning('Not except your friend request'); 
  
        }
      });
    } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    }
    }


    Cancel(index) {
      try {
        this.prods.userid_mobile=localStorage.getItem('use');
        this.prods.linkid_mobile=this.friend_OR_notFriend[index].mobile;
          
  
        this.api.postdata('feedbacks/cancelfriend_feedback', this.prods).subscribe((rsq: any) => {
        console.log(rsq);
        // console.log(rsq.data[0].id)
        if(rsq.data.length > 0){
          this.warning('Cancel your friend request '); 
         
  
        }
        else{
          this.warning('Cancel your friend request'); 
  
        }
      });
    } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    }
    }

    ionViewWillEnter()
    { 
      if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
        return;
      }
      try {
   
        this.checkORnot.CompanyID=parseInt(localStorage.getItem('com'));
        this.checkORnot.userid=parseInt(localStorage.getItem('uid'));
        this.checkORnot.mobile=localStorage.getItem('use');
        this.checkORnot.password=localStorage.getItem('pas');
       
        this.api.postdata('UserIns/user_Checkornot', this.checkORnot).subscribe((rsq: any) => {
        console.log(rsq);
       // console.log(rsq.data[0].id)
        if(rsq.data[0].id == 0){
         // this.reset();
          this.gowarning("Please login");
        }
      });
      } catch (error) {
     // this.api.showWarningToast('insert failed..' + error);
    } 
      if(!this.call)
       {
        this.collapse = true;
       this.fileToUpload =null;
    //console.log('load ng on');
    this.loadimage();
    this.loadfriend_OR_notFriend();
       }
      
     
    }
  
    ionViewDidLeave()
    {
      console.log("it will leave")
      this.call=false
    }


    async gowarning(massage: any){
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
     
       this.routes.navigateByUrl('/login');
    }

}
