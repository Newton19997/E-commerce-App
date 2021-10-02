import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForpaymentPageRoutingModule } from './forpayment-routing.module';

import { ForpaymentPage } from './forpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForpaymentPageRoutingModule
  ],
  declarations: [ForpaymentPage]
})
export class ForpaymentPageModule {}
