import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportPage } from '../../reports/report/report.page';

import { VieworderPage } from './vieworder.page';

const routes: Routes = [
  { path: '', component: VieworderPage },
  {path: 'report/:id' , component: ReportPage},
  {path: 'report/:id/:FDate/:TDate' , component: ReportPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VieworderPageRoutingModule {}
