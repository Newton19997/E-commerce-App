import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemviewPage } from '../itemviews/itemview/itemview.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {path: '', component: HomePage, },
  { path: 'itemview', loadChildren: () => import('../itemviews/itemview/itemview.module').then( m => m.ItemviewPageModule) },
  // { path: 'itemview/:id', loadChildren: () => import('../itemviews/itemview/itemview.module').then( m => m.ItemviewPageModule) },

  { path: 'cos', loadChildren: () => import('../coss/cos/cos.module').then( m => m.CosPageModule) },
  { path: 'cos/:cid/:CampanyID', loadChildren: () => import('../coss/cos/cos.module').then( m => m.CosPageModule) },
  // { path: 'pfl-cutting-update/:id/:categoryID', component: PflCuttingUpdateComponent },
  //{path: 'itemview/:id', component: ItemviewPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
