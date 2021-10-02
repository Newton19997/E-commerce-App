import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdloginPage } from './adlogin.page';

const routes: Routes = [
  { path: '', component: AdloginPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdloginPageRoutingModule {}
