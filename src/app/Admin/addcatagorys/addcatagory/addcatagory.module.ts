import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcatagoryPageRoutingModule } from './addcatagory-routing.module';

import { AddcatagoryPage } from './addcatagory.page';
import { ApiService } from 'src/app/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcatagoryPageRoutingModule,
    NgbModule
  ],
  declarations: [AddcatagoryPage],
  providers: [
  //  StatusBar,
   // SplashScreen,
   
   // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   ApiService
  ]

})
export class AddcatagoryPageModule {}
