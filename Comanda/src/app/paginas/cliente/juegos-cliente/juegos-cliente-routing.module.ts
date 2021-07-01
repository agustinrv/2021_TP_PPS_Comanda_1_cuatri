import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosClientePage } from './juegos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosClientePage
  },
  {
    path: 'juego-adivinar',
    loadChildren: () => import('./juego-adivinar/juego-adivinar.module').then( m => m.JuegoAdivinarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosClientePageRoutingModule {}
