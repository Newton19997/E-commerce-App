import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemviewPage } from './itemview.page';

const routes: Routes = [
  {
    path: '',
    component: ItemviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemviewPageRoutingModule {}
