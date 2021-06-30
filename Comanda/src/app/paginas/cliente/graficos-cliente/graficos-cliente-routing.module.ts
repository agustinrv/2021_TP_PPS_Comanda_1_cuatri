import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficosClientePage } from './graficos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: GraficosClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficosClientePageRoutingModule {}
