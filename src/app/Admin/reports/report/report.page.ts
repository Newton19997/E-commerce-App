import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  AllItems:any;
  page = 1;
  pageSize =500;
  items = [];
  RULid:any;
  Fdate:any;
  Tdate:any;
  collapse = false;
  collapses = false;
  collapsess= false;
  collapsessl= false;
  collapsesslitem=false;
  collapsesslitemBalance=false;
  checkORnot:any;
  AllIuser:any;
  Summeryitem:any;
  mobil: any;
  iname:any;
  Itemser:any;
  Catagory:any;
  Catagorys:any;
  UserNo:any;
  comid:any;
  prods:any;
  constructor(public api: ApiService, public route: ActivatedRoute,public routes: Router,public toastController: ToastController) { 
    
    //for edit
this.route.params.subscribe( param => {
  if (param.id) {
    this.RULid=param.id;
    this.Fdate=param.FDate;
    this.Tdate=param.TDate;
   // this.getProduct(param.id);
   this.comid = parseInt(localStorage.getItem('com'));
   console.log('newtddonnn'+this.comid )
  }
});
this.checkORnot={};
this.prods = {};
// this.comid =(localStorage.getItem('com'));
// console.log('newtonnn'+this.comid )
  }

  ionViewWillEnter()
  {  
  
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
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
  ngOnInit() {
    if (localStorage.getItem('com')==null || localStorage.getItem('com')=='0'){
      return;
    }
    if(this.RULid==1){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.Day_Not_Pay();
    }
    else if(this.RULid == 2){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.Day_wise_Pay();
    }
    else if(this.RULid == 3){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.Day_wisePaymwnt_Pay();
    }
    else if(this.RULid == 4){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.Day_partialPaymwnt_Pay();
    }
    else if(this.RULid == 5){

      this.collapse = false;
      this.collapses = true;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.Allitemlist();
    }
    else if(this.RULid == 6){
      this.collapse = false;
      this.collapses = true;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.minqty_Allitemlist();
    }
    else if(this.RULid == 7){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
     if(this.Fdate && this.Tdate){
      this.Date_wise_Not_Pay();
     }else{
     this.warning("You didn't select Date ");
     }
 
    
    }
    else if(this.RULid == 8){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      if(this.Fdate && this.Tdate){
      this.Date_wise_Pay();
    }else{
      this.warning("You didn't select Date ");
      }
    }
    else if(this.RULid == 9){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      if(this.Fdate && this.Tdate){
      this.Date_wisePaymwnt_Pay();
    }else{
      this.warning("You didn't select Date ");
      }
    }
    else if(this.RULid == 10){
      this.collapse = true;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;

      if(this.Fdate && this.Tdate){
      this.Date_partialPaymwnt_Pay();
    }else{
      this.warning("You didn't select Date ");
      }
    }
    else if(this.RULid == 11){
      this.collapse = false;
      this.collapses = false;
      this.collapsess= true;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
      this.CatagoryList();
    }
    else if(this.RULid == 12){
      this.collapse = false;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= true;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=false;
     if(this.comid == 1)
     {
      this.AllUserList();
     }
     else{ this.componywiseUserList();}
     
    }
    else if(this.RULid == 13){
      this.collapse = false;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=true;
      this.collapsesslitemBalance=false;
      this.componywiseItemSummery();
    }
    else if(this.RULid == 14){
      this.collapse = false;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
     
      this.collapsesslitem=true;
      this.collapsesslitemBalance=false;
     // this.componywiseItemDetails();
    }
    else if(this.RULid == 15){
      this.collapse = false;
      this.collapses = false;
      this.collapsess= false;
      this.collapsessl= false;
      this.collapsesslitem=false;
      this.collapsesslitemBalance=true;
      this.componywiseItemSummeryTotalBalance();
    }
  }

  searchOrder(){
    if(this.RULid == 1){
     this.Day_Not_Pay();
    }else if(this.RULid == 2){
      this.Day_wise_Pay();
    }else if(this.RULid == 3){
      this.Day_wisePaymwnt_Pay();
    }else if(this.RULid == 4){
      this.Day_partialPaymwnt_Pay();
    }else if(this.RULid == 7){
      this.Date_wise_Not_Pay();
    }else if(this.RULid == 8){
      this.Date_wise_Pay();
    }else if(this.RULid == 9){
      this.Date_wisePaymwnt_Pay();
    }else if(this.RULid == 10){
      this.Date_partialPaymwnt_Pay();
    }
  }


  searchCatagoryList(){
    if(this.RULid == 11){
      this.functioncatagory_search();
    }
  }

  
  functioncatagory_search(){
    this.items=[]; 
    let link = 'order/Catagory_pro_search?ComID=' + localStorage.getItem('com');
    if ( this.Catagory) link += '&iname=' + encodeURIComponent(this.Catagory);   
    this.api.getdata(link).subscribe((res: any) => {
      this.Catagorys = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.Catagorys.length; i++)
         { 
        this.items.push(this.Catagorys[i]);
        }
    });
  }

  searchItemmin(){
    if(this.RULid == 5){
      this.functionItem_search();
    }
    if(this.RULid == 6){
      this.functionMin_Item_search();
    }
  }


  functionMin_Item_search(){
    this.items=[]; 
    let link = 'order/min_Item_search?ComID=' + localStorage.getItem('com');
    if ( this.iname) link += '&iname=' + encodeURIComponent(this.iname);   
    this.api.getdata(link).subscribe((res: any) => {
      this.Itemser = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.Itemser.length; i++)
         { 
        this.items.push(this.Itemser[i]);
        }
    });
  }

  searchItemNameList(){
    if(this.RULid == 13){
      this.componywiseItemSummery();
    }else if(this.RULid == 15)
    {
      this.componywiseItemSummeryTotalBalance();
    }
    else{
      this.componywiseItemDetails();
    }
  }

  functionItem_search(){
    this.items=[]; 
    let link = 'order/Item_search?ComID=' + localStorage.getItem('com');
    if ( this.iname) link += '&iname=' + encodeURIComponent(this.iname);   
    this.api.getdata(link).subscribe((res: any) => {
      this.Itemser = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.Itemser.length; i++)
         { 
        this.items.push(this.Itemser[i]);
        }
    });
  }



  componywiseItemDetails(){
    this.items=[]; 
    let link = 'order/ItemDetails?ComID=' + localStorage.getItem('com');
    if ( this.iname) link += '&iname=' + encodeURIComponent(this.iname);   
    this.api.getdata(link).subscribe((res: any) => {
      this.Summeryitem = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.Summeryitem.length; i++)
         { 
        this.items.push(this.Summeryitem[i]);
        }
    });
  }

  componywiseItemSummeryTotalBalance(){
    this.items=[]; 
    let link = 'order/ItemSummeryTotalBalance?ComID=' + localStorage.getItem('com');
    if ( this.iname) link += '&iname=' + encodeURIComponent(this.iname);   
    this.api.getdata(link).subscribe((res: any) => {
      this.Summeryitem = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.Summeryitem.length; i++)
         { 
        this.items.push(this.Summeryitem[i]);
        }
    });
  }


  componywiseItemSummery(){
    this.items=[]; 
    let link = 'order/ItemSummery?ComID=' + localStorage.getItem('com');
    if ( this.iname) link += '&iname=' + encodeURIComponent(this.iname);   
    this.api.getdata(link).subscribe((res: any) => {
      this.Summeryitem = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.Summeryitem.length; i++)
         { 
        this.items.push(this.Summeryitem[i]);
        }
    });
  }

  searchUserList() {
if(localStorage.getItem('com')== '1')
{
  this.AllUserList();
}
  else{
    this.items=[]; 
    let link = 'UserIns/searchUserLists?comid=' + localStorage.getItem('com');
    if ( this.mobil) link += '&mobile=' + encodeURIComponent(this.mobil);   
    this.api.getdata(link).subscribe((res: any) => {
      this.AllIuser = res; 
      console.log( 'itema'+ res);
      for (var i = 0; i < this.AllIuser.length; i++)
         { 
        this.items.push(this.AllIuser[i]);
        }
    });
  }
  }

  AllUserList(){ 
    if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
    {
      this.UNLogin('You can login after ');       
    
     
    }else{
    this.items=[];   
   // let link = `ItemMasters/loadgetseachItemforADD?`;    
    // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
   // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
   // this.api.getdata(link).subscribe((res: any) => {
       this.api.getdata('adminlogins/loadAlluser?mobil='+this.mobil).subscribe((res: any) => {
     this.AllIuser = res; 
      //console.log( 'itema'+ res);
      for (var i = 0; i < this.AllIuser.length; i++)
         { 
        this.items.push(this.AllIuser[i]);
        }
  
      });
     //  for pagination end
    // console.log( 'itema'+ this.items);
    }
    };

  componywiseUserList(){ 
    if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
    {
      this.UNLogin('You can login after ');       
    
     
    }else{
    this.items=[];   
   // let link = `ItemMasters/loadgetseachItemforADD?`;    
    // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
   // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
   // this.api.getdata(link).subscribe((res: any) => {
       this.api.getdata('UserIns/UserList?comid=' + localStorage.getItem('com')+'&mobil='+this.mobil).subscribe((res: any) => {
     this.AllIuser = res; 
      //console.log( 'itema'+ res);
      for (var i = 0; i < this.AllIuser.length; i++)
         { 
        this.items.push(this.AllIuser[i]);
        }
  
      });
     //  for pagination end
    // console.log( 'itema'+ this.items);
    }
    };

  CatagoryList() { 
    if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
    {
      this.UNLogin('You can login after ');       
    
     
    }else{
    this.items=[];   
   // let link = `ItemMasters/loadgetseachItemforADD?`;    
    // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
   // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
   // this.api.getdata(link).subscribe((res: any) => {
       this.api.getdata('order/Catagory_List?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.AllItems = res; 
      for (var i = 0; i < this.AllItems.length; i++)
         { 
        this.items.push(this.AllItems[i]);
        }
  
      });
     //  for pagination end
    // console.log( 'itema'+ this.items);
    }
    };
  Day_Not_Pay() { 
    if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
    {
      this.UNLogin('You can login after ');       
    
     
    }else{
    this.items=[]; 

   // let link = `ItemMasters/loadgetseachItemforADD?`;    
    // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
   // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
   // this.api.getdata(link).subscribe((res: any) => {

    let link = 'order/Day_Not_Pay_order?comid=' + localStorage.getItem('com');
    if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
    this.api.getdata(link).subscribe((res: any) => {

      // this.api.getdata('order/Day_Not_Pay_order?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
      this.AllItems = res; 
      console.log( 'itema'+ this.AllItems);
      for (var i = 0; i < this.AllItems.length; i++)
         { 
        this.items.push(this.AllItems[i]);
        }
  
      });
     //  for pagination end
    // console.log( 'itema'+ this.items);
    }
    };

    
    Day_wise_Pay() { 
      if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
      {
        this.UNLogin('You can login after ');       
      
       
      }else{
      this.items=[];   
     // let link = `ItemMasters/loadgetseachItemforADD?`;    
      // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
     // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
     // this.api.getdata(link).subscribe((res: any) => {

      let link = 'order/Day_Pay_order?comid=' + localStorage.getItem('com');
      if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
      this.api.getdata(link).subscribe((res: any) => {

         //this.api.getdata('order/Day_Pay_order?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
        this.AllItems = res; 
        for (var i = 0; i < this.AllItems.length; i++)
           { 
          this.items.push(this.AllItems[i]);
          }
    
        });
       //  for pagination end
      // console.log( 'itema'+ this.items);
      }
      };

      Day_wisePaymwnt_Pay() { 
        this.items=[];   
       // let link = `ItemMasters/loadgetseachItemforADD?`;    
        // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
       // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
       // this.api.getdata(link).subscribe((res: any) => {


        let link = 'order/Day_Paymwnt_order?comid=' + localStorage.getItem('com');
        if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
        this.api.getdata(link).subscribe((res: any) => {
          
          // this.api.getdata('order/Day_Paymwnt_order?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
          this.AllItems = res; 
          // console.log( 'itemadddddd');
          // console.log(this.AllItems);
          for (var i = 0; i < this.AllItems.length; i++)
             { 
            this.items.push(this.AllItems[i]);
            }
      
          });
         //  for pagination end
        // console.log( 'itema'+ this.items);
        };

        Day_partialPaymwnt_Pay() { 
          this.items=[];  
          if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
          {
            this.UNLogin('You can login after ');       
          
           
          }else{ 
         // let link = `ItemMasters/loadgetseachItemforADD?`;    
          // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
         // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
         // this.api.getdata(link).subscribe((res: any) => {

          let link = 'order/Day_partialPaymwnt_order?comid=' + localStorage.getItem('com');
          if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
          this.api.getdata(link).subscribe((res: any) => {

           //  this.api.getdata('order/Day_partialPaymwnt_order?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
            this.AllItems = res; 
            for (var i = 0; i < this.AllItems.length; i++)
               { 
              this.items.push(this.AllItems[i]);
              }
        
            });
           //  for pagination end
          // console.log( 'itema'+ this.items);
          }
          };

          Allitemlist() { 
            this.items=[]; 
            if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
            {
              this.UNLogin('You can login after ');       
            
             
            }else{  
           // let link = `ItemMasters/loadgetseachItemforADD?`;    
            // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
           // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
           // this.api.getdata(link).subscribe((res: any) => {
               this.api.getdata('order/companywiseAllitemlist?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
              this.AllItems = res; 
              for (var i = 0; i < this.AllItems.length; i++)
                 { 
                this.items.push(this.AllItems[i]);
                }
          
              });
             //  for pagination end
            // console.log( 'itema'+ this.items);
            }
            };

            minqty_Allitemlist() { 
              this.items=[];  
              if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
              {
                this.UNLogin('You can login after ');       
              
               
              }else{ 
             // let link = `ItemMasters/loadgetseachItemforADD?`;    
              // if ( this.searchcom) {link += '&itemname=' + encodeURIComponent(this.searchcom);}
             // if (!this.CompanyId) { link += '&comid=' + localStorage.getItem('com'); }
             // this.api.getdata(link).subscribe((res: any) => {
                 this.api.getdata('order/companywiseAllitemlist_min?comid=' + localStorage.getItem('com')).subscribe((res: any) => {
                this.AllItems = res; 
                for (var i = 0; i < this.AllItems.length; i++)
                   { 
                  this.items.push(this.AllItems[i]);
                  }
            
                });
               //  for pagination end
              // console.log( 'itema'+ this.items);
              }
              };
  
              // {arg: 'comID', type: 'number', required: false },
              // {arg: 'fromdate', type: 'string', required: false },
              // {arg: 'todate', type: 'string', required: false },
              // {arg: 'url', type: 'number', required: false }


              Date_wise_Not_Pay(){
                this.items=[]; 
                if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
                {
                  this.UNLogin('You can login after ');       
                
                 
                }else{  
                  let link = 'order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate+'&todate='+ this.Tdate +'&url=' + this.RULid ;
                  if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
                  this.api.getdata(link).subscribe((res: any) => {    
                    
                    //this.api.getdata('order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate +'&todate='+ this.Tdate +'&url=' + this.RULid+'&userNo=' + encodeURIComponent(this.UserNo)).subscribe((res: any) => {
                   this.AllItems = res; 
                   for (var i = 0; i < this.AllItems.length; i++)
                      { 
                     this.items.push(this.AllItems[i]);
                     }
               
                   });
                  }
              }
              Date_wise_Pay(){
                // let link ;
                // if (this.UserNo) link = encodeURIComponent(this.UserNo); 
                // console.log("newton chack")
                // console.log(this.UserNo);
                // console.log(link);

                this.items=[];
                if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
                {
                  this.UNLogin('You can login after ');       
                
                 
                }else{    
                  
                  let link = 'order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate +'&todate='+ this.Tdate +'&url=' + this.RULid;
                  if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
                  this.api.getdata(link).subscribe((res: any) => {                  
                // this.api.getdata('order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate +'&todate='+ this.Tdate +'&url=' + this.RULid +'&userNo=' + link).subscribe((res: any) => {
              
                  this.AllItems = res; 
               for (var i = 0; i < this.AllItems.length; i++)
                  { 
                 this.items.push(this.AllItems[i]);
                 }
           
               });
              }
              }
              Date_wisePaymwnt_Pay(){
                this.items=[];  
                if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
                {
                  this.UNLogin('You can login after ');       
                
                 
                }else{  
                  
                  let link = 'order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate+'&todate='+ this.Tdate +'&url=' + this.RULid ;
                  if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
                  this.api.getdata(link).subscribe((res: any) => {                  
            
               // this.api.getdata('order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate+'&todate='+ this.Tdate +'&url=' + this.RULid +'&userNo=' + encodeURIComponent(this.UserNo)).subscribe((res: any) => {
               this.AllItems = res; 
               for (var i = 0; i < this.AllItems.length; i++)
                  { 
                 this.items.push(this.AllItems[i]);
                 }
           
               });
              }
              }
              Date_partialPaymwnt_Pay(){
                this.items=[]; 
                if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
                {
                  this.UNLogin('You can login after ');       
                
                 
                }else{    
                  
                  let link = 'order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate+'&todate='+ this.Tdate +'&url=' + this.RULid ;
                  if ( this.UserNo) link += '&userNo=' + encodeURIComponent(this.UserNo);   
                  this.api.getdata(link).subscribe((res: any) => {                  
            
                  
               // this.api.getdata('order/Data_searchorder?comID=' + localStorage.getItem('com')+'&fromdate='+ this.Fdate+'&todate='+ this.Tdate +'&url=' + this.RULid+'&userNo=' + encodeURIComponent(this.UserNo)).subscribe((res: any) => {
               this.AllItems = res; 
               for (var i = 0; i < this.AllItems.length; i++)
                  { 
                 this.items.push(this.AllItems[i]);
                 }
           
               });
              }
              }



              async deleteItem(index){
           
                  const data = {
                    'data': { 'record': this.AllItems[index],
                      'byuQty': 0,
                      'Size': 0,
                      
                    }};
                  console.log(data);
                 
          if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
              {
                this.UNLogin('You can login after Order Delete');       
              
               
              }else{
                await  this.api.patchdata('order/deleteUserOrderADmin', data).subscribe((res: any) => {
                  console.log(res);
              
                  if(res.data.length > 0)
                         { 
                          this.warning('Order delete successfull');
                          this.ngOnInit()
                         // this.successorder();
                          //  this.routes.navigateByUrl('/admin');
                         }
                         else {
                          this.warning('Order delete Not successfull');
                          this.ngOnInit()
                         // this.UNsuccessorder();
                           //this.api.showSuccessToast('Login faild');
                     
                         }
                });
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
                
  async UNLogin(message:any){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      animated:false, 
      position:'middle', 
      color:'warning',
      });  
    toast.present();
    toast.onDidDismiss().then((val)=>{
    console.log('toast Dismissed !')
    });
    this.routes.navigateByUrl('/adlogin');
  }


  async deleteUser(index){
    
           
      const data = {
        'data': { 'record': this.AllIuser[index],
          'byuQty': 0,
          'Size': 0,
          
        }};
      console.log(data);
     
if(!localStorage.getItem('use') && !localStorage.getItem('pas') && !localStorage.getItem('com') )
  {
    this.UNLogin('You can login after User Delete');       
  
   
  }else{
    await  this.api.patchdata('UserIns/deleteUserCompany', data).subscribe((res: any) => {
      console.log(res);
  
      if(res.data.length > 0)
             { 
              this.warning('User delete successfull');
              this.ngOnInit()
             // this.successorder();
              //  this.routes.navigateByUrl('/admin');
             }
             else {
              this.warning('User delete Not successfull');
              this.ngOnInit()
             // this.UNsuccessorder();
               //this.api.showSuccessToast('Login faild');
         
             }
    });
    }
    }


  resetpass(index){
    // if(this.AllIuser[index].uid==0)
      this.prods.uid=this.AllIuser[index].uid;
     

      this.api.postdata('adminlogins/ChangpassUpdate', this.prods).subscribe(async(rsq: any) => {
      console.log(rsq);
     // console.log(rsq.data[0].id)
      if(rsq.data[0].uid){
        
        //for massage
const toast = await this.toastController.create({
  message: 'Your password have been Changed.',
  duration: 2000,
  animated:false, 
  position:'top', 
  color:'warning',
  });   
  
toast.present();
toast.onDidDismiss().then((val)=>{
//console.log('toast Dismissed !')
setTimeout(() => {
//  this.usercheck("Please login");
}, 300);
});
//for massage end

      }
    });
  }
}
