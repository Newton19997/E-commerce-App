import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcatagoryPage } from './addcatagory.page';

const routes: Routes = [
  { path: '', component: AddcatagoryPage },
  {path: 'addcatagory/:id' , component: AddcatagoryPage},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcatagoryPageRoutingModule {}
