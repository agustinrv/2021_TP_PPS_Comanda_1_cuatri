import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabilitarClientePage } from './habilitar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: HabilitarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabilitarClientePageRoutingModule {}
