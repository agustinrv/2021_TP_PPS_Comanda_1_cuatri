import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuListaEsperaPage } from './menu-lista-espera.page';

const routes: Routes = [
  {
    path: '',
    component: MenuListaEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuListaEsperaPageRoutingModule {}
