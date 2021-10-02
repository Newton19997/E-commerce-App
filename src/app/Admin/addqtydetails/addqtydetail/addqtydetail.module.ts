import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddqtydetailPageRoutingModule } from './addqtydetail-routing.module';

import { AddqtydetailPage } from './addqtydetail.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddqtydetailPageRoutingModule,
    NgbModule
  ],
  declarations: [AddqtydetailPage]
})
export class AddqtydetailPageModule {}
