import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirComidaPage } from './pedir-comida.page';

const routes: Routes = [
  {
    path: '',
    component: PedirComidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirComidaPageRoutingModule {}
