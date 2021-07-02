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
  },  {
    path: 'juego-tateti',
    loadChildren: () => import('./juego-tateti/juego-tateti.module').then( m => m.JuegoTatetiPageModule)
  },
  {
    path: 'juego-ppt',
    loadChildren: () => import('./juego-ppt/juego-ppt.module').then( m => m.JuegoPptPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosClientePageRoutingModule {}
