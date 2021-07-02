import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPedidosPageRoutingModule } from './detalles-pedidos-routing.module';

import { DetallesPedidosPage } from './detalles-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPedidosPageRoutingModule
  ],
  declarations: [DetallesPedidosPage]
})
export class DetallesPedidosPageModule {}
