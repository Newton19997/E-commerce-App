import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdchangepasswordPageRoutingModule } from './adchangepassword-routing.module';

import { AdchangepasswordPage } from './adchangepassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdchangepasswordPageRoutingModule
  ],
  declarations: [AdchangepasswordPage]
})
export class AdchangepasswordPageModule {}
