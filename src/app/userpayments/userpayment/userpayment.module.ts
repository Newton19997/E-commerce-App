import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserpaymentPageRoutingModule } from './userpayment-routing.module';

import { UserpaymentPage } from './userpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserpaymentPageRoutingModule
  ],
  declarations: [UserpaymentPage]
})
export class UserpaymentPageModule {}
