import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule} from '@angular/common/http';
//import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminPageModule } from './Admin/admins/admin/admin.module';
import { CategoryPageModule } from './categorys/category/category.module';
import { HomePageModule } from './home/home.module';
import { ItemviewPageModule } from './itemviews/itemview/itemview.module';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';
import { ItemdetailsPageModule } from './Admin/additems/itemdetails/itemdetails.module';
import { AddquantityPageRoutingModule } from './Admin/addquantitys/addquantity/addquantity-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyPageRoutingModule } from './Admin/companys/company/company-routing.module';
import { AdloginPageModule } from './Admin/adminlogins/adlogin/adlogin.module';
import { CosPageRoutingModule } from './coss/cos/cos-routing.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { AppPageRoutingModule } from './Admin/companys/company/company-routing.module';

import { IonicSelectableModule } from 'ionic-selectable';
import { ModalPageRoutingModule} from './modals/modal/modal-routing.module'


import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     HttpClientModule,
    // LoadingBarHttpClientModule,
     AdminPageModule,
     //CategoryPageModule
     HomePageModule,
     ItemviewPageModule,
     ItemdetailsPageModule,
     AddquantityPageRoutingModule,     
     CompanyPageRoutingModule,
     NgbModule,
     AdloginPageModule,
     CosPageRoutingModule,
     //newton
     IonicSelectableModule,
     ModalPageRoutingModule
    
    ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    ApiService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ,InAppBrowser
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
