import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatMeseroPage } from './chat-mesero.page';

const routes: Routes = [
  {
    path: '',
    component: ChatMeseroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatMeseroPageRoutingModule {}
