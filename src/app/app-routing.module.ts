import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoryPageModule } from './categorys/category/category.module';
import { ChatPage } from './chats/chat/chat.page';
import { HomePage } from './home/home.page';
import { LocalBazzarPage } from './localBazzars/local-bazzar/local-bazzar.page';

const routes: Routes = [
                        { path: '', redirectTo: 'home',  pathMatch: 'full' },
                        { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },                      
                        { path: 'category', loadChildren: () => import('./categorys/category/category.module').then( m => m.CategoryPageModule) },
                        { path: 'login', loadChildren: () => import('./logins/login/login.module').then( m => m.LoginPageModule) },
                        { path: 'registration', loadChildren: () => import('./registrations/registration/registration.module').then( m => m.RegistrationPageModule) },
                        { path: 'feedback', loadChildren: () => import('./feedbacks/feedback/feedback.module').then( m => m.FeedbackPageModule) },
                        { path: 'contact',  loadChildren: () => import('./contacts/contact/contact.module').then( m => m.ContactPageModule) },
 
  {  path: 'cos',    loadChildren: () => import('./coss/cos/cos.module').then( m => m.CosPageModule) },
    //  {path: 'cos', loadChildren: () => CategoryPageModule , data: {preload:true}},

  { path: 'admin', loadChildren: () => import('./Admin/admins/admin/admin.module').then( m => m.AdminPageModule) },
  { path: 'adlogin',loadChildren: () => import('./Admin/adminlogins/adlogin/adlogin.module').then( m => m.AdloginPageModule) },
  { path: 'itemview', loadChildren: () => import('./itemviews/itemview/itemview.module').then( m => m.ItemviewPageModule) },
  
  { path: 'itemdetails', loadChildren: () => import('./Admin/additems/itemdetails/itemdetails.module').then( m => m.ItemdetailsPageModule) },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepasswords/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'userpayment',
    loadChildren: () => import('./userpayments/userpayment/userpayment.module').then( m => m.UserpaymentPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payments/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'addqtydetail',
    loadChildren: () => import('./Admin/addqtydetails/addqtydetail/addqtydetail.module').then( m => m.AddqtydetailPageModule)
  },
  {
    path: 'forpayment',
    loadChildren: () => import('./forpayments/forpayment/forpayment.module').then( m => m.ForpaymentPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./Admin/reports/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'datereport',
    loadChildren: () => import('./Admin/datereports/datereport/datereport.module').then( m => m.DatereportPageModule)
  },
  {
    path: 'adchangepassword',
    loadChildren: () => import('./Admin/adchangepasswords/adchangepassword/adchangepassword.module').then( m => m.AdchangepasswordPageModule)
  },
  {path: 'home/:id' , component: HomePage},
  {
    path: 'chatroom',
    loadChildren: () => import('./chatrooms/chatroom/chatroom.module').then( m => m.ChatroomPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chats/chat/chat.module').then( m => m.ChatPageModule)
  },
  {path: 'chat/:mobile/:name' , component: ChatPage},
  {
    path: 'local-bazzar',
    loadChildren: () => import('./localBazzars/local-bazzar/local-bazzar.module').then( m => m.LocalBazzarPageModule)
  },
  {path: 'local-bazzar/:id' , component: LocalBazzarPage},
  {
    path: 'modal',
    loadChildren: () => import('./modals/modal/modal.module').then( m => m.ModalPageModule)
  },
  /*
  { path: 'addcatagory', loadChildren: () => import('./Admin/addcatagorys/addcatagory/addcatagory.module').then( m => m.AddcatagoryPageModule)  },
  { path: 'additem', loadChildren: () => import('./Admin/additems/additem/additem.module').then( m => m.AdditemPageModule)  },
  { path: 'addquantity', loadChildren: () => import('./Admin/addquantitys/addquantity/addquantity.module').then( m => m.AddquantityPageModule)  },
  { path: 'vieworder', loadChildren: () => import('./Admin/vieworders/vieworder/vieworder.module').then( m => m.VieworderPageModule) },
  { path: 'viewpayment', loadChildren: () => import('./Admin/viewpayments/viewpayment/viewpayment.module').then( m => m.ViewpaymentPageModule) },
  { path: 'addfeedback', loadChildren: () => import('./Admin/addfeedbacks/addfeedback/addfeedback.module').then( m => m.AddfeedbackPageModule)  },
  { path: 'company', loadChildren: () => import('./Admin/companys/company/company.module').then( m => m.CompanyPageModule) },
  */
                      ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
