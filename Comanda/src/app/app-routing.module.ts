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
    loadChildren: () => import('./supervisor/home-super/home-super.module').then( m => m.HomeSuperPageModule)
  },
  {
    path: 'habilitar-cliente',
    loadChildren: () => import('./supervisor/habilitar-cliente/habilitar-cliente.module').then( m => m.HabilitarClientePageModule)
  },
  {
    path: 'home-anonimo',
    loadChildren: () => import('./paginas/anonimo/home-anonimo/home-anonimo.module').then( m => m.HomeAnonimoPageModule)
  },
  {
    path: 'home-metre',
    loadChildren: () => import('./paginas/metre/home-metre/home-metre.module').then( m => m.HomeMetrePageModule)
  },
  {
    path: 'solicitar-mesa',
    loadChildren: () => import('./paginas/anonimo/solicitar-mesa/solicitar-mesa.module').then( m => m.SolicitarMesaPageModule)
  },
  {
    path: 'solicitudes-mesas',
    loadChildren: () => import('./paginas/metre/solicitudes-mesas/solicitudes-mesas.module').then( m => m.SolicitudesMesasPageModule)
  },  {
    path: 'mesa-clientes',
    loadChildren: () => import('./paginas/mesa-clientes/mesa-clientes.module').then( m => m.MesaClientesPageModule)
  },

  


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
