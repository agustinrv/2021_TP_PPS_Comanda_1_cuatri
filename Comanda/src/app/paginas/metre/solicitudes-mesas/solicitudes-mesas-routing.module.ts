import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesMesasPage } from './solicitudes-mesas.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesMesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesMesasPageRoutingModule {}
