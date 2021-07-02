import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarPagoPage } from './confirmar-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarPagoPageRoutingModule {}
