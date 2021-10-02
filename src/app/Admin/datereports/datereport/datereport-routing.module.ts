import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatereportPage } from './datereport.page';

const routes: Routes = [
  {
    path: '',
    component: DatereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatereportPageRoutingModule {}
