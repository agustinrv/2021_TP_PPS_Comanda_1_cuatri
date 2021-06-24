import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosTerminadosPageRoutingModule } from './pedidos-terminados-routing.module';

import { PedidosTerminadosPage } from './pedidos-terminados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosTerminadosPageRoutingModule
  ],
  declarations: [PedidosTerminadosPage]
})
export class PedidosTerminadosPageModule {}
