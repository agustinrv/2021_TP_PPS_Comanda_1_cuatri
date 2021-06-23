import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosTerminadosPage } from './pedidos-terminados.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosTerminadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosTerminadosPageRoutingModule {}
