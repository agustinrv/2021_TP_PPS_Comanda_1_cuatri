import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosCocineroPage } from './pedidos-cocinero.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosCocineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosCocineroPageRoutingModule {}
