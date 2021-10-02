import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatereportPageRoutingModule } from './datereport-routing.module';

import { DatereportPage } from './datereport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatereportPageRoutingModule
  ],
  declarations: [DatereportPage]
})
export class DatereportPageModule {}
