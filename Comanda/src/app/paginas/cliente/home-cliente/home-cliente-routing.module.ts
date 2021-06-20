import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeClientePage } from './home-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: HomeClientePage,
    children: [
      {
        path: 'pedir',
        loadChildren: () => import('../../../paginas/cliente/pedir-comida/pedir-comida.module').then( m => m.PedirComidaPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../../../paginas/cliente/chat-cliente/chat-cliente.module').then( m => m.ChatClientePageModule)
      },
      {
        path: 'encuesta',
        loadChildren: () => import('../../../paginas/cliente/encuesta-cliente/encuesta-cliente.module').then( m => m.EncuestaClientePageModule)
      },
      {
        path: '',
        redirectTo: 'pedir'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClientePageRoutingModule {}
