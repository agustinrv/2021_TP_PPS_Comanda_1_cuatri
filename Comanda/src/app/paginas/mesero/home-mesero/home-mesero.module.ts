import { ModalDetallesPedidosComponent } from './../modal-detalles-pedidos/modal-detalles-pedidos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeMeseroPageRoutingModule } from './home-mesero-routing.module';

import { HomeMeseroPage } from './home-mesero.page';
import { ModalPedidosSinConfirmarComponent } from '../modal-pedidos-sin-confirmar/modal-pedidos-sin-confirmar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeMeseroPageRoutingModule
  ],
  declarations: [
    HomeMeseroPage,
    ModalDetallesPedidosComponent,
    ModalPedidosSinConfirmarComponent
  ]
})
export class HomeMeseroPageModule {}
