import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

export class datetimes {
  FromDate: any;
  ToDate:any;
  CompanyID: any;
  }
@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.page.html',
  styleUrls: ['./vieworder.page.scss'],
})
export class VieworderPage implements OnInit {
  prod:any;
  page = 1;
  pageSize =15;
  items = [];
  searchprods:any;
  searchUser:any;
 FromDate:any;
 ToDate:any;
 FDate:any;
 TDate:any;
 DateFormat: any

 date:any;
 myFutureDate:any;
todate:any;

datet:any;
myFutureDatet:any;
todatet:any;
  constructor(public api: ApiService ,private route: ActivatedRoute,public toastController: ToastController,private routes: Router ) {
    this.prod = new datetimes();

    this.DateFormat=new Date();
    var dd = String(this.DateFormat.getDate()).padStart(2, '0');
    var mm = String(this.DateFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = this.DateFormat.getFullYear();
     this.DateFormat = mm + '/' + dd + '/' + yyyy;
  //  this.ToDate=new Date();
    console.log(this.DateFormat);
   // this.toDate='';
   this.FDate=this.DateFormat;
   this.TDate=this.DateFormat;
   }

   /*
   checkFromDate(){
   // console.log(e.target.value);
  //  console.log(this.model)
   this.DateFormat=new Date()
  //  this.FromDate=new Date();
   var dd = String(this.DateFormat.getDate()).padStart(2, '0');
   var mm = String(this.DateFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.DateFormat.getFullYear();
    this.FromDate = mm + '/' + dd + '/' + yyyy; 
   console.log(this.FromDate);

  }*/


   async fromdatecheck(){
       //for massage
 const toast = await this.toastController.create({
  message: 'To date can not be less from date  ',
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
   checkFromDate(e){
    
   // console.log(this.ToDate);
    console.log(typeof e.target.value);
     /*
    console.log(e.target.value);
    let date = new Date(e.target.value);
    console.log(date);
   // var myCurrentDate=new Date();
    var myFutureDate=new Date(date);
        myFutureDate.setDate(myFutureDate.getDate()+ 30);
        console.log(myFutureDate);
        this.ToDate=myFutureDate;
        console.log(this.ToDate);
        */

        //-----------------------------
       
         this.date = new Date(e.target.value);
        var dd = String(this.date.getDate()).padStart(2, '0');
        var mm = String(this.date.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = this.date.getFullYear();    
         this.date = mm + '/' + dd + '/' + yyyy;
      //  this.ToDate=new Date();
       this.FDate=this.date;
      //  console.log(this.date);


       this.myFutureDate=new Date(this.date);
       this.myFutureDate.setDate(this.myFutureDate.getDate()+ 30);
        console.log(this.myFutureDate);
       // this.ToDate=this.myFutureDate;
       // console.log(this.ToDate);


        var dd = String(this.myFutureDate.getDate()).padStart(2, '0');
        var mm = String(this.myFutureDate.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = this.myFutureDate.getFullYear();    
         this.todate = mm + '/' + dd + '/' + yyyy;
        //this.ToDate=new Date();    
       // console.log(this.date); 
// if(this.TDate<this.todate){
//   this.fromdatecheck()
//   return;
// }

       if(this.TDate>this.todate){
         this.TDate= this.todate;
        }
        if(this.TDate<this.FDate){
          this.fromdatecheck();
          this.DateFormat=new Date();
          var dd = String(this.DateFormat.getDate()).padStart(2, '0');
          var mm = String(this.DateFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
           var yyyy = this.DateFormat.getFullYear();
           this.DateFormat = mm + '/' + dd + '/' + yyyy;
        //  this.ToDate=new Date();
          console.log(this.DateFormat);
         // this.toDate='';
         this.FDate=this.DateFormat;
         this.TDate=this.DateFormat;
          return;
        }
       //--------------------------

    }

    checkToDate(e){
   
   /*   console.log(this.prod.FromDate);
  console.log(typeof e.target.value);
    console.log(e.target.value);
    let date = new Date(e.target.value);
    console.log(date);
   // var myCurrentDate=new Date();
    var myoldDate=new Date(date);
    myoldDate.setDate(myoldDate.getDate()-30);
        console.log(myoldDate);
        this.prod.FromDate=myoldDate;
        console.log( this.prod.FromDate);
        *///-----------------------------
       
          // console.log(typeof e.target.value);
          // console.log(e.target.value);
          // this.FromDate=e.target.value.toString();

          this.datet = new Date(e.target.value);
          var dd = String(this.datet.getDate()).padStart(2, '0');
          var mm = String(this.datet.getMonth() + 1).padStart(2, '0'); //January is 0!
           var yyyy = this.datet.getFullYear();    
           this.datet = mm + '/' + dd + '/' + yyyy;
        //  this.ToDate=new Date();
        
     // console.log( this.TDate);
  
     if(this.FDate>this.datet){
      this.fromdatecheck();
      return;
    }
  
    this.TDate=this.datet;
    
         this.myFutureDatet=new Date(this.datet);
         this.myFutureDatet.setDate(this.myFutureDatet.getDate()- 30);
          console.log(this.myFutureDatet);
        //  this.FromDate=this.myFutureDatet.toString();;
          //console.log(this.ToDate);
  
  
          var dd = String(this.myFutureDatet.getDate()).padStart(2, '0');
          var mm = String(this.myFutureDatet.getMonth() + 1).padStart(2, '0'); //January is 0!
           var yyyy = this.myFutureDatet.getFullYear();    
           this.todatet = mm + '/' + dd + '/' + yyyy;
          //this.ToDate=new Date();    
         // console.log(this.date); 



         if(this.FDate<this.todatet){
          this.FDate= this.todatet;
         }
         //  this.FDate= this.todatet;
         if(this.TDate<this.FDate){
          this.fromdatecheck();
          this.DateFormat=new Date();
          var dd = String(this.DateFormat.getDate()).padStart(2, '0');
          var mm = String(this.DateFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
           var yyyy = this.DateFormat.getFullYear();
           this.DateFormat = mm + '/' + dd + '/' + yyyy;
        //  this.ToDate=new Date();
          console.log(this.DateFormat);
         // this.toDate='';
         this.FDate=this.DateFormat;
         this.TDate=this.DateFormat;
          return;
        }

    }

    
  
  ngOnInit() {
  }

}
