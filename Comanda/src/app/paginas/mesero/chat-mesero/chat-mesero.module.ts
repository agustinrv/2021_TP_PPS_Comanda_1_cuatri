import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatMeseroPageRoutingModule } from './chat-mesero-routing.module';

import { ChatMeseroPage } from './chat-mesero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatMeseroPageRoutingModule
  ],
  declarations: [ChatMeseroPage]
})
export class ChatMeseroPageModule {}
