import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemviewPageRoutingModule } from './itemview-routing.module';

import { ItemviewPage } from './itemview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemviewPageRoutingModule
  ],
  declarations: [ItemviewPage]
})
export class ItemviewPageModule {}
