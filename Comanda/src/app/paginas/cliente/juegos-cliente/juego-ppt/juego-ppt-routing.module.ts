import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoPptPage } from './juego-ppt.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoPptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoPptPageRoutingModule {}
