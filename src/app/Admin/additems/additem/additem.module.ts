import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditemPageRoutingModule } from './additem-routing.module';

import { AdditemPage } from './additem.page';
import { ItemdetailsPageRoutingModule } from '../itemdetails/itemdetails-routing.module';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditemPageRoutingModule,
    ItemdetailsPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [AdditemPage]
})
export class AdditemPageModule {}
