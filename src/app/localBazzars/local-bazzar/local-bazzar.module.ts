import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalBazzarPageRoutingModule } from './local-bazzar-routing.module';

import { LocalBazzarPage } from './local-bazzar.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalBazzarPageRoutingModule,
    NgbModule
  ],
  declarations: [LocalBazzarPage]
})
export class LocalBazzarPageModule {}
