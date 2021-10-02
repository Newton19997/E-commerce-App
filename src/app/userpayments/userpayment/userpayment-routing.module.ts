import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserpaymentPage } from './userpayment.page';

const routes: Routes = [
  {
    path: '',
    component: UserpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpaymentPageRoutingModule {}
