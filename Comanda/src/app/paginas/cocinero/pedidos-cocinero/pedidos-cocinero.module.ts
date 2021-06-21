import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosCocineroPageRoutingModule } from './pedidos-cocinero-routing.module';

import { PedidosCocineroPage } from './pedidos-cocinero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosCocineroPageRoutingModule
  ],
  declarations: [PedidosCocineroPage]
})
export class PedidosCocineroPageModule {}
