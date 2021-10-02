import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddquantityPage } from '../../addquantitys/addquantity/addquantity.page';

import { AddqtydetailPage } from './addqtydetail.page';

const routes: Routes = [
  {
    path: '', component: AddqtydetailPage },
    {path: 'addquantity/:id/:QtID' , component: AddquantityPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddqtydetailPageRoutingModule {}
