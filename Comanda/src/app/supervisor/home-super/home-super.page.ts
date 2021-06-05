import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-home-super',
  templateUrl: './home-super.page.html',
  styleUrls: ['./home-super.page.scss'],
})
export class HomeSuperPage implements OnInit {

  listadoUsuarios : any;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

}
