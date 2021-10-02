import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosPage } from './cos.page';

const routes: Routes = [
  { path: '',  component: CosPage  },
  { path: 'itemview', loadChildren: () => import('../../itemviews/itemview/itemview.module').then( m => m.ItemviewPageModule) },
  { path: 'itemview/:CompanyID/:cid/:iid', loadChildren: () => import('../../itemviews/itemview/itemview.module').then( m => m.ItemviewPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosPageRoutingModule {}
