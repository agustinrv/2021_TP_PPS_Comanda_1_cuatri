import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeMeseroPage } from './home-mesero.page';

const routes: Routes = [
  {
    path: '',
    component: HomeMeseroPage,
    children: [
      {
        path: 'pedidos-sin-confirmar',
        loadChildren: () => import('../pedidos-sin-confirmar/pedidos-sin-confirmar.module').then( m => m.PedidosSinConfirmarPageModule)
      },
      {
        path: 'pedidos-pendientes',
        loadChildren: () => import('../pedidos-pendientes/pedidos-pendientes.module').then( m => m.PedidosPendientesPageModule)
      },
      {
        path: 'pedidos-terminados',
        loadChildren: () => import('../pedidos-terminados/pedidos-terminados.module').then( m => m.PedidosTerminadosPageModule)
      },
      {
        path: 'encuesta',
        loadChildren: () => import('../../../paginas/cliente/encuesta-cliente/encuesta-cliente.module').then( m => m.EncuestaClientePageModule)
      },
      {
        path: '',
        redirectTo: 'pedidos-sin-confirmar'
      }
    ]
  },
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMeseroPageRoutingModule {}
