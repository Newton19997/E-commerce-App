import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfeedbackPageRoutingModule } from './addfeedback-routing.module';

import { AddfeedbackPage } from './addfeedback.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfeedbackPageRoutingModule,
    NgbModule
  ],
  declarations: [AddfeedbackPage]
})
export class AddfeedbackPageModule {}
