import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';

@Component({
  selector: 'app-home-anonimo',
  templateUrl: './home-anonimo.page.html',
  styleUrls: ['./home-anonimo.page.scss'],
})
export class HomeAnonimoPage implements OnInit {

  listadoUsuarios : any;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

  public SolicitarMesa()
  {
    this.router.navigateByUrl('solicitar-mesa');
  }

  

}
