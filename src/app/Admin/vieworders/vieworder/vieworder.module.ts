import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VieworderPageRoutingModule } from './vieworder-routing.module';

import { VieworderPage } from './vieworder.page';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VieworderPageRoutingModule
    //,NgbModule
  ],
  declarations: [VieworderPage]
})
export class VieworderPageModule {}
