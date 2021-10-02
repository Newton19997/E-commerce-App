import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contact:any;
  mas:any;
  check:boolean=false;
  login:any;
  constructor(public api: ApiService) {
   this.mas='আপনার যদি অন্য কোনও তথ্যের প্রয়োজন হয় তবে যোগাযোগ করুন . এই ';
   }

  ngOnInit() {
    this.loadContactInfo();
    this.check=true;
    this.login=localStorage.getItem('uid');
    //console.log('ng')
  }

  ionViewWillEnter() 
  { 
    if(!this.check){
      console.log('lo')
    this.loadContactInfo();
    this.login=localStorage.getItem('uid');
  }
}
ionViewDidLeave()
{
  //console.log("it will leave")
  this.check=false
}
 loadContactInfo() {
    // console.log(this.cId);
    // console.log(this.companyID);
    if(!localStorage.getItem('com')){
    this.api.getdata('order/contactCompany?comid=1').subscribe((res: any) => {   
      this.contact = res;     
      console.log(res);
    });
  }
  else{
    this.api.getdata('order/contactCompany?comid=' + localStorage.getItem('com')).subscribe((res: any) => {   
      this.contact = res;     
      console.log(res);
    });
  }
  }

}
