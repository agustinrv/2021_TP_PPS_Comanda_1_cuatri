import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-home-super',
  templateUrl: './home-super.page.html',
  styleUrls: ['./home-super.page.scss'],
})
export class HomeSuperPage implements OnInit {

  listadoUsuarios : any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private localNotifications: LocalNotifications,
    private fire: UsuarioService
    ) { }

  ngOnInit() {
    this.fire.TraerTodos().valueChanges().subscribe((users)=>{
      //console.log(users);
      this.listadoUsuarios = users;
      this.listadoUsuarios.forEach(user => {
        if(!user.habilitado && user.perfil == 3){
          this.LanzarNotificacion(user);
        }
      });
    });
  }

  CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }


  LanzarNotificacion(user:any){
    this.localNotifications.schedule([{
      id: 1,
      title: 'El Mazacote',
      text: 'Tiene a alguien para habilitar: ' + user.nombre,
      sound: true ? 'file://sound.mp3': 'file://beep.caf'
     }]);
  }

}
