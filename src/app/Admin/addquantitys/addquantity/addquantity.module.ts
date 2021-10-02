import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddquantityPageRoutingModule } from './addquantity-routing.module';

import { AddquantityPage } from './addquantity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddquantityPageRoutingModule
  ],
  declarations: [AddquantityPage]
})
export class AddquantityPageModule {}
