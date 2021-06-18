import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesaClientesPage } from './mesa-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: MesaClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesaClientesPageRoutingModule {}
