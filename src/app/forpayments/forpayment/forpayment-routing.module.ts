import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForpaymentPage } from './forpayment.page';

const routes: Routes = [
  {
    path: '',
    component: ForpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForpaymentPageRoutingModule {}
