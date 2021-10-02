import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosPage } from 'src/app/coss/cos/cos.page';

import { CategoryPage } from './category.page';

const routes: Routes = [
  {path: '', component: CategoryPage},
   //{path: '', component: CosPage,},
  // {    path: '',    loadChildren: () => import('../../coss/cos/cos.module').then( m => m.CosPageModule)}
  { path: 'cos', loadChildren: () => import('../../coss/cos/cos.module').then( m => m.CosPageModule) },
  { path: 'cos/:cid/:CampanyID', loadChildren: () => import('../../coss/cos/cos.module').then( m => m.CosPageModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
