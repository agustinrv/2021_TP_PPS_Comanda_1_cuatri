import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'home-super',
    loadChildren: () => import('./paginas/supervisor/home-super/home-super.module').then( m => m.HomeSuperPageModule)
  },
  {
    path: 'habilitar-cliente',
    loadChildren: () => import('./paginas/supervisor/habilitar-cliente/habilitar-cliente.module').then( m => m.HabilitarClientePageModule)
  },
  {
    path: 'home-anonimo',
    loadChildren: () => import('./paginas/anonimo/home-anonimo/home-anonimo.module').then( m => m.HomeAnonimoPageModule)
  },
  {
    path: 'home-metre',
    loadChildren: () => import('./paginas/metre/home-metre/home-metre.module').then( m => m.HomeMetrePageModule)
  },
  {//CLiente/anonimo
    path: 'solicitar-mesa',
    loadChildren: () => import('./paginas/anonimo/solicitar-mesa/solicitar-mesa.module').then( m => m.SolicitarMesaPageModule)
  },
  {//Metre
    path: 'solicitudes-mesas',
    loadChildren: () => import('./paginas/metre/solicitudes-mesas/solicitudes-mesas.module').then( m => m.SolicitudesMesasPageModule)
  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./paginas/altas/alta-cliente/alta-cliente.module').then( m => m.AltaClientePageModule)
  },
  {
    path: 'home-cliente',
    loadChildren: () => import('./paginas/cliente/home-cliente/home-cliente.module').then( m => m.HomeClientePageModule)
  },
  {
    path: 'home-cocinero',
    loadChildren: () => import('./paginas/cocinero/home-cocinero/home-cocinero.module').then( m => m.HomeCocineroPageModule)
  },
  {
    path: 'pedidos-cocinero',
    loadChildren: () => import('./paginas/cocinero/pedidos-cocinero/pedidos-cocinero.module').then( m => m.PedidosCocineroPageModule)
  },
  {
    path: 'modal-pedido',
    loadChildren: () => import('./paginas/cliente/modal-pedido/modal-pedido.module').then( m => m.ModalPedidoPageModule)
  },
  {
    path: 'home-bartender',
    loadChildren: () => import('./paginas/bartender/home-bartender/home-bartender.module').then( m => m.HomeBartenderPageModule)
  },
  {
    path: 'pedidos-bartender',
    loadChildren: () => import('./paginas/bartender/pedidos-bartender/pedidos-bartender.module').then( m => m.PedidosBartenderPageModule)
  },
  {
    path: 'home-mesero',
    loadChildren: () => import('./paginas/mesero/home-mesero/home-mesero.module').then( m => m.HomeMeseroPageModule)
  },
  {
    path: 'chat-mesero',
    loadChildren: () => import('./paginas/mesero/chat-mesero/chat-mesero.module').then( m => m.ChatMeseroPageModule)
  },
  {
    path: 'menu-espera-cliente',
    loadChildren: () => import('./paginas/cliente/menu-espera-cliente/menu-espera-cliente.module').then( m => m.MenuEsperaClientePageModule)
  },
  {
    path: 'estado-pedido',
    loadChildren: () => import('./paginas/cliente/estado-pedido/estado-pedido.module').then( m => m.EstadoPedidoPageModule)
  },
  {
    path: 'encuesta-cliente',
    loadChildren: () => import('./paginas/cliente/encuesta-cliente/encuesta-cliente.module').then( m => m.EncuestaClientePageModule)
  },
  {
    path: 'graficos-cliente',
    loadChildren: () => import('./paginas/cliente/graficos-cliente/graficos-cliente.module').then( m => m.GraficosClientePageModule)
  },
  {
    path: 'juegos-cliente',
    loadChildren: () => import('./paginas/cliente/juegos-cliente/juegos-cliente.module').then( m => m.JuegosClientePageModule)
  },
  {
    path: 'pide-cuenta',
    loadChildren: () => import('./paginas/cliente/pide-cuenta/pide-cuenta.module').then( m => m.PideCuentaPageModule)
  },
  {
    path: 'confirmar-pago',
    loadChildren: () => import('./paginas/mesero/confirmar-pago/confirmar-pago.module').then( m => m.ConfirmarPagoPageModule)
  },
  {
    path: 'detalles-pedidos',
    loadChildren: () => import('./paginas/mesero/detalles-pedidos/detalles-pedidos.module').then( m => m.DetallesPedidosPageModule)
  },

  


 


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
