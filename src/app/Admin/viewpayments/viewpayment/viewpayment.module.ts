import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpaymentPageRoutingModule } from './viewpayment-routing.module';

import { ViewpaymentPage } from './viewpayment.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpaymentPageRoutingModule,
    NgbModule
  ],
  declarations: [ViewpaymentPage]
})
export class ViewpaymentPageModule {}
