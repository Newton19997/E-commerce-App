import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemdetailsPageRoutingModule } from './itemdetails-routing.module';

import { ItemdetailsPage } from './itemdetails.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemdetailsPageRoutingModule,
    NgbModule
  ],
  declarations: [ItemdetailsPage]
})
export class ItemdetailsPageModule {}
