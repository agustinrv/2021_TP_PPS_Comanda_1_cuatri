import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosBartenderPageRoutingModule } from './pedidos-bartender-routing.module';

import { PedidosBartenderPage } from './pedidos-bartender.page';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosBartenderPageRoutingModule
  ],
  declarations: [
    PedidosBartenderPage,
    ModalPedidoComponent
  ]
})
export class PedidosBartenderPageModule {}
