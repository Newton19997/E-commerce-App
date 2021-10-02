import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
chatuserImage:any;
mobilno:any;
name:any;
call : boolean=false;
checkORnot:any;


//------chat--------newton-------
message = '';
messages = [];
currentUser = '';
writing = false;
size :number=4;
clopase=true;
newMsg:string;

chatuser:any;
messerial:any;

inmess:any;
linkusername:any
hide : boolean

fileToUpload :File =null;
file: any;
imageUrl:string="../../../../assets/upimg/images.png";
messImageserial:any;
Cimage:any;
page=0;
maximumPages: any;


done = 0;
check =0;
RowNo: any;
currRowNo=1;
delmes:any;
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public api: ApiService,private route: ActivatedRoute,public routes: Router,public toastController: ToastController) {
    this.route.params.subscribe( param => {
      if (param.mobile) {
        this.mobilno=param.mobile;
        this.name=param.name;
        this.loadimage(param.mobile);
      }
      this.currentUser=localStorage.getItem('use');
    });

    this.checkORnot={};
    this.inmess={};
   }

  
  //for AutoLoad function start
async randomSleep() {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 9000));
}

//let done = 0;

async  execute1() {
   console.log('Execute 1 started.')
   this.randomSleep();
   return 'done'
}

// function run = () => {
  run(){
  // var check =0
  if(this.check != 0){
  this.execute1().then(result => {
    console.log('Execute 1 ended')
    this.done++
    console.log(`Done ${this.done} times.`)
    console.log(`Now waiting for 2 seconds`)

    // this.loadchatmessage_Row(event);
    // console.log(`RowNo ${this.RowNo[0].Ro } No.`) ;
    // console.log(`currRowNo ${this.currRowNo} curr.`);
    this.api.getdata('feedbacks/getchatmessage_page_row?usermobil=' + localStorage.getItem('use')+'&linkmobil='+  this.mobilno +'&page='+ this.page ).subscribe((res: any) => {
      this.RowNo = res;     
      if(this.RowNo[0].Ro != this.currRowNo)
      {
       this.currRowNo=this.RowNo[0].Ro ;
     this.loadchatmessage(event);    
     }
 });

 setTimeout(() => {
  this.run();
  }, 3000)

  })
 }
}


//for AutoLoad function end

loadchatmessage_Row(event){  
    this.api.getdata('feedbacks/getchatmessage_page_row?usermobil=' + localStorage.getItem('use')+'&linkmobil='+  this.mobilno +'&page='+ this.page ).subscribe((res: any) => {
      this.RowNo = res;     
      console.log("   this.RowNo");
    console.log(this.RowNo); 
  }, err => {
    console.log('err', this.RowNo);
  });

// if(event){
//   event.target.complete();
// }

}
  
   ngOnInit() { 
    this.check=1;
    console.log('this.ngOnInit()');
    this.run();

    this.chatuser=[]; 
    this.call= true; 
    this.hide= true
    this.loadchatmessage(event);
    this.loadmessSerial();
    //this.loadchatmessage_Row(event);
     
    // Handle is typing event
    // this.client.event.subscribe('chat:typing', (payload) => {
    //   if(payload.username !== this.user.username) {
    //     this.typing = payload.username + ' is typing...'
    //     setTimeout(() => {
    //       this.typing = ''
    //     }, 2000)
    //   }
    // })


  }
  loadimage(mobileno:any){
    // console.log('load image');
    this.call= true; 
     this.api.getdata('feedbacks/getImage?mobil=' + mobileno).subscribe((res: any) => {
       this.chatuserImage = res;
       this.linkusername=res[0].Uname
       console.log(res);
     }, err => {
       console.log('err', this.chatuserImage);
     });
   
   }
 
   ionViewWillEnter()
   { 
    this.size =4;
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
      //  this.collapse = true;
      // this.fileToUpload =null;
   //console.log('load ng on');    
   this.loadimage(this.mobilno);
   this.check=1;
   //console.log('this.ionViewWillEnter()');
   this.run();
      }    
    
   }
 

   ionViewWillLeave() {
    console.log("it willnewton leave")
   // this.socket.disconnect();
  }
   ionViewDidLeave()
   {
     console.log("it will leave")
     this.call=false;
     this.check=0;
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




// for chat newton



onKeyPress(){
  console.log("call")
  this.writing= true;
  this.size=10
}

onKeydown(){
  console.log("call 2")
  this.writing= false;
  this.size=10
}


onChange(e) {

  console.log(e.target.value.length)
  this.newMsg= e.target.value
  if(this.newMsg.length>0)
    this.hide=false 
  else  this.hide=true
  
 // this.client.event.emit('chat:typing', this.user);
}

loadchatmessage(event){
  this.chatuser=[];
  // this.api.getdata('feedbacks/getchatmessage?usermobil=' + localStorage.getItem('use')+'&linkmobil='+  this.mobilno).subscribe((res: any) => {
    this.api.getdata('feedbacks/getchatmessage_page?usermobil=' + localStorage.getItem('use')+'&linkmobil='+  this.mobilno +'&page='+ this.page ).subscribe((res: any) => {
      this.chatuser = res;

      this.maximumPages=this.chatuser[0].totalPage;
      console.log("res");
    console.log(res);
    console.log(this.maximumPages);
  }, err => {
    console.log('err', this.chatuser);
  });

// if(event){
//   event.target.complete();
// }

}

sendMessage(){
 
  this.hide=true
 // this.loadmessSerial();

 this.api.getdata('feedbacks/getlocalerialmess').subscribe((res: any) => {
  this.messerial = res;
  console.log(res);
  try {    
    this.inmess.userid_mobile=localStorage.getItem('use');
    this.inmess.uname=this.name;
    this.inmess.message=this.newMsg;
    this.inmess.image=''; 
    this.inmess.imageNo=parseInt(this.messerial[0].sl); 
    this.inmess.audiocall='';
    this.inmess.vediocall='';
    //this.inmess.entrydate=Date.now()+6*3600*1000;
    this.inmess.CompanyID=parseInt(localStorage.getItem('com'));
    this.inmess.statusID=0;
    this.inmess.linkid_mobile= this.mobilno;
    this.inmess.linkuser= this.linkusername;
    this.inmess.Exta='';
   console.log(this.inmess);
    this.api.postdata('feedbacks/insertchatmessage', this.inmess).subscribe((rsq: any) => {
    console.log(rsq);
   // console.log(rsq.data[0].id)
    if(rsq.data.length >0){    
      this.loadchatmessage(event);
      this.reset();
    }
  });
  } catch (error) {}
});
}

loadmessSerial(){

  this.api.getdata('feedbacks/getlocalerialmess').subscribe((res: any) => {
    this.messerial = res;
    console.log(res);
  }, err => {
    console.log('err', this.messerial);
  });
}


fileChanged(e) {
  this.file = e.target.files[0];
}


  uploadFilenewton(files: FileList) {
    // this.collapse = true;
    console.log('image');

    this.fileToUpload = files.item(0);
  var reader =new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl =event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload)
   
  }


  loadImageSerial(){

    this.api.getdata('feedbacks/getlocalerialmess').subscribe((res: any) => {
      this.messImageserial = res;
      console.log(res);
    }, err => {
      console.log('err', this.messImageserial);
    });
  }
 

  uploadFilenewton1(files: FileList) {
  
  
      const file = files.item(0);  
      const folder = 'UserMessageImage';

     // console.log(this.Imageserial.sl);

     this.api.getdata('feedbacks/getlocalerialmess').subscribe((res: any) => { 
      this.messImageserial = res;
      // console.log('res');
      // console.log(res);
    //})

        const imagename=  this.messImageserial[0].sl+".jpg"
          // console.log(imagename);
         this.api.uploadFile(folder, file,imagename).subscribe(res => {          
       this.Cimage = 'fileuploads/' + folder + '/download/' + imagename;
  



console.log("this.newMsg")

console.log(this.newMsg)

      this.inmess.userid_mobile=localStorage.getItem('use');
      this.inmess.uname=this.name;
      this.inmess.message=this.newMsg;
      this.inmess.image=this.Cimage; 
      this.inmess.imageNo=parseInt(this.messImageserial[0].sl); 
      this.inmess.audiocall='';
      this.inmess.vediocall='';
      //this.inmess.entrydate=Date.now()+6*3600*1000;
      this.inmess.CompanyID=parseInt(localStorage.getItem('com'));
      this.inmess.statusID=0;
      this.inmess.linkid_mobile= this.mobilno;
      this.inmess.linkuser= this.linkusername;
      this.inmess.Exta='';
      console.log('this.inmess');
     console.log(this.inmess);
      this.api.postdata('feedbacks/insertchatmessage', this.inmess).subscribe((rsq: any) => {
        // console.log("rsq");
        // console.log(rsq);
      console.log(rsq.data[0].fid)
      if(rsq.data.length> 0){    
        this.loadchatmessage(event);
        this.reset();
      }
    });


      }, err => {
        console.log(err);
      });
    });
    }

    reset(){
      console.log('reset');
     this.newMsg='';
   this.Cimage=''; 
   this.size=4;
   this.writing=false
   console.log(this.size)
   this.loadImageSerial();
    }

loadMore(event){
  setTimeout(() => {
  console.log(event);
  event.target.complete();
  this.page++;
  console.log("sfsg");
  console.log(this.page);
  this.loadchatmessage(event);

  if(this.page === this.maximumPages){
    event.target.disabled=true;
  }
}, 3000);
}



loadData(event) {
  setTimeout(() => {
    console.log('Done');
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    // if (data.length == 20) {
    //   event.target.disabled = true;
    // }

    this.page++;
    console.log("sfsg");
    console.log(this.page);
    this.loadchatmessage(event);
  
    if(this.page === this.maximumPages){
      event.target.disabled=true;
    }

  }, 3000);
}

toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}
co(){
  console.log("cog");
  //console.log(this.page);
}

show(index)
{
  if(this.chatuser[index].fid>0){

    this.api.getdata('feedbacks/getchatmessageDelete?fig='+ this.chatuser[index].fid ).subscribe((res: any) => {
      this.delmes = res;     
    //   console.log("rzxxes");
    // console.log(this.delmes );
    // this.loadchatmessage(event);
  }, err => {
    console.log('err', this.chatuser);
  });

    // console.log("show");
    // console.log(this.chatuser[index].fid);
  }
 
}
}
