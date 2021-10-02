import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdloginPageRoutingModule } from './adlogin-routing.module';
import { AdloginPage } from './adlogin.page';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdloginPageRoutingModule,
    IonicSelectableModule
   
  ],
  declarations: [AdloginPage]
})
export class AdloginPageModule {}
