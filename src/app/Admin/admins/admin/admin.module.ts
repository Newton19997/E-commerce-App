import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule} from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { ApiService } from 'src/app/api.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage],
  providers: [
    //  StatusBar,
     // SplashScreen,
     
     // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     ApiService
    ]
})
export class AdminPageModule {}
