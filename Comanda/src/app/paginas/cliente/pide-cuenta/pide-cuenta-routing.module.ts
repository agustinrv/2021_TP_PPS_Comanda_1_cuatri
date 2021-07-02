import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PideCuentaPage } from './pide-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: PideCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PideCuentaPageRoutingModule {}
