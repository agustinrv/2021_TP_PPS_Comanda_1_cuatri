import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-home-cocinero',
  templateUrl: './home-cocinero.page.html',
  styleUrls: ['./home-cocinero.page.scss'],
})
export class HomeCocineroPage implements OnInit {

  constructor( private auth: AuthService,private router:Router) { }

  ngOnInit() {  
  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

  public AbrirPedidosCocinero()
  {
    this.router.navigateByUrl('/pedidos-cocinero');
  }

}
