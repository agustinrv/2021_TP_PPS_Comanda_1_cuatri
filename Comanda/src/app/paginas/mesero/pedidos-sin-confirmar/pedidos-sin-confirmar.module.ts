import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosSinConfirmarPageRoutingModule } from './pedidos-sin-confirmar-routing.module';

import { PedidosSinConfirmarPage } from './pedidos-sin-confirmar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosSinConfirmarPageRoutingModule
  ],
  declarations: [PedidosSinConfirmarPage]
})
export class PedidosSinConfirmarPageModule {}
