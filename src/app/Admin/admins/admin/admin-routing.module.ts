import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForpaymentPage } from 'src/app/forpayments/forpayment/forpayment.page';
import { AddcatagoryPage } from '../../addcatagorys/addcatagory/addcatagory.page';
import { AddquantityPage } from '../../addquantitys/addquantity/addquantity.page';
import { CompanyPage } from '../../companys/company/company.page';
import { ReportPage } from '../../reports/report/report.page';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {path: '', component: AdminPage },
  
  {path: 'addcatagory', loadChildren: () => import('../../addcatagorys/addcatagory/addcatagory.module').then( m => m.AddcatagoryPageModule)}, 
  { path: 'additem',  loadChildren: () => import('../../additems/additem/additem.module').then( m => m.AdditemPageModule) },
  { path: 'addquantity', loadChildren: () => import('../../addquantitys/addquantity/addquantity.module').then( m => m.AddquantityPageModule) },
  { path: 'vieworder', loadChildren: () => import('../../vieworders/vieworder/vieworder.module').then( m => m.VieworderPageModule) },
  { path: 'viewpayment', loadChildren: () => import('../../viewpayments/viewpayment/viewpayment.module').then( m => m.ViewpaymentPageModule) },
  { path: 'addfeedback', loadChildren: () => import('../../addfeedbacks/addfeedback/addfeedback.module').then( m => m.AddfeedbackPageModule) },
  { path: 'company', loadChildren: () => import('../../companys/company/company.module').then( m => m.CompanyPageModule) },

  { path: 'itemdetails', loadChildren: () => import('../../additems/itemdetails/itemdetails.module').then( m => m.ItemdetailsPageModule) },
  {path: 'company/:id' , component: CompanyPage},
  {path: 'addcatagory/:id' , component: AddcatagoryPage},
  {path: 'addquantity/:id/:QtID' , component: AddquantityPage},
   {path: 'forpayment/:id' , component: ForpaymentPage},
   {path: 'report/:id' , component: ReportPage},
   {path: 'report/:id/:FDate/:TDate' , component: ReportPage}
];
//./Admin/addfeedbacks/addfeedback/addfeedback.module

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
