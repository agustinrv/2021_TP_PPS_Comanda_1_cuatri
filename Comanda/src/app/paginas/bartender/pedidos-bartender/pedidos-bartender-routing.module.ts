import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosBartenderPage } from './pedidos-bartender.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosBartenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosBartenderPageRoutingModule {}
