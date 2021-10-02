import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ItemviewPageModule } from '../itemviews/itemview/itemview.module';
import { CosPageModule } from '../coss/cos/cos.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ItemviewPageModule,
    CosPageModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
