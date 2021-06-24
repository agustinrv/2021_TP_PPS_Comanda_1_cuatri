import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
@Component({
  selector: 'app-home-bartender',
  templateUrl: './home-bartender.page.html',
  styleUrls: ['./home-bartender.page.scss'],
})
export class HomeBartenderPage implements OnInit {

  constructor( private auth: AuthService,private router:Router) { }

  ngOnInit() {  
  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

  public AbrirPedidosBarTender()
  {
    this.router.navigateByUrl('/pedidos-bartender');
  }

}
