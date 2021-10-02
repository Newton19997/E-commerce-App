import { Component, OnInit } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA, Inject, NgModule} from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
ui:any;
pa:any;
co:any;
call : boolean=false;
company:any;
  constructor(public api: ApiService) {
   
   }

  ngOnInit() {
    this.call= true;
    this.co=localStorage.getItem('com');
    if(this.co==1){
      this.company=100;
    }
  }


  ionViewWillEnter()
  { 
   
    // this.previousQty=[]
    // this.quantity=[]
    if(!this.call)
     {

    this.co=localStorage.getItem('com');
    if(this.co==1){
      this.company=100;
    }
     }
    
   
  }

  ionViewDidLeave()
  {
    console.log("it will leave");
    this.call=false
    this.company='';
  }

}
