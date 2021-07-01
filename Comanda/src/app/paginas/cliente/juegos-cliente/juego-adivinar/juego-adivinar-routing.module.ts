import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoAdivinarPage } from './juego-adivinar.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoAdivinarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoAdivinarPageRoutingModule {}
