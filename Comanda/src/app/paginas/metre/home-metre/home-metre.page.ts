import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-home-metre',
  templateUrl: './home-metre.page.html',
  styleUrls: ['./home-metre.page.scss'],
})
export class HomeMetrePage implements OnInit {

  listadoUsuarios : any;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.firebaseAuth.authState.subscribe(user=>{
      if(user!=null)
      {
        console.log(user.email);
      }
      
    })

  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

  public VerSolicitudes()
  {
    this.router.navigateByUrl('solicitudes-mesas');
  }

  public CargarCliente()
  {
    this.router.navigateByUrl('alta-cliente');
  }

}


