import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForpaymentPage } from 'src/app/forpayments/forpayment/forpayment.page';

import { ViewpaymentPage } from './viewpayment.page';

const routes: Routes = [
  {
    path: '', component: ViewpaymentPage },
    {path: 'forpayment/:id' , component: ForpaymentPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpaymentPageRoutingModule {}
