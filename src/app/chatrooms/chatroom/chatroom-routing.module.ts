import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatroomPage } from './chatroom.page';

const routes: Routes = [
  {path: '', component: ChatroomPage },
  { path: 'chat/:mobile/:name', loadChildren: () => import('../../chats/chat/chat.module').then( m => m.ChatPageModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatroomPageRoutingModule {}
