import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuEsperaClientePage } from './menu-espera-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: MenuEsperaClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuEsperaClientePageRoutingModule {}
