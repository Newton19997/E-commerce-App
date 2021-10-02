import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditemPage } from '../additem/additem.page';

import { ItemdetailsPage } from './itemdetails.page';

const routes: Routes = [
  {
    path: '', component: ItemdetailsPage },
    {path: 'additem/:id' , component: AdditemPage},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemdetailsPageRoutingModule {}
