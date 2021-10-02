import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalBazzarPage } from './local-bazzar.page';

const routes: Routes = [
  {path: '', component: LocalBazzarPage },
  {path: 'local-bazzar/:id' , component: LocalBazzarPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalBazzarPageRoutingModule {}
