import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddquantityPage } from './addquantity.page';

const routes: Routes = [
  {
    path: '',
    component: AddquantityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddquantityPageRoutingModule {}
