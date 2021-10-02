import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';
import { LoginPage } from './login.page';


const routes: Routes = [
  {path: '', component: LoginPage },
  {path: 'home/:id' , component: HomePage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
