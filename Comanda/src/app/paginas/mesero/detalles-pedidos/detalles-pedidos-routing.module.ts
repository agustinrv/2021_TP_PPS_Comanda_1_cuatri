import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPedidosPage } from './detalles-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPedidosPageRoutingModule {}
