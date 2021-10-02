import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CosPageRoutingModule } from './cos-routing.module';
import { CosPage } from './cos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosPageRoutingModule
  ],
  declarations: [CosPage]
})
export class CosPageModule {}
