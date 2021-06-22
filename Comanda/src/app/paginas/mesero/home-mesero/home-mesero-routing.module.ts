import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeMeseroPage } from './home-mesero.page';

const routes: Routes = [
  {
    path: '',
    component: HomeMeseroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMeseroPageRoutingModule {}
