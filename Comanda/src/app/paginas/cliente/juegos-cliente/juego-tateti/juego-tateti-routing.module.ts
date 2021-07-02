import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoTatetiPage } from './juego-tateti.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoTatetiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoTatetiPageRoutingModule {}
