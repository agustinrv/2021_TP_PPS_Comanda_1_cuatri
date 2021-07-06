import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { init } from "emailjs-com";
import { Router } from '@angular/router';
init("user_zMd1PHHGOv2xVOv0fEPbl");

@Component({
  selector: 'app-habilitar-cliente',
  templateUrl: './habilitar-cliente.page.html',
  styleUrls: ['./habilitar-cliente.page.scss'],
})
export class HabilitarClientePage implements OnInit {
  
  listadoUsuarios : any[] = [];

  public cantListadoUsuarios:number;

  public cargoListadoUsuarios=false;

  constructor(
    private fire: UsuarioService,
    private auth: AuthService,
    private router: Router,
    private localNotifications:LocalNotifications) { }

  ngOnInit() {
    this.fire.TraerTodos().valueChanges().subscribe((users)=>{
      console.log(users);
      this.listadoUsuarios = users.filter((value)=>{
        return value.perfil == 3 && !value.habilitado;
      });

      if(!this.cargoListadoUsuarios)
      {
        this.cantListadoUsuarios=this.listadoUsuarios.length;
        this.cargoListadoUsuarios=true;
      }

      if(this.cantListadoUsuarios<this.listadoUsuarios.length)
      {
         this.LanzarNotificacion(this.listadoUsuarios.length);
      }
    });

  }

  CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }


  AceptarCliente(user){
    user.habilitado = true;
    this.fire.ModificarUno(user);
    this.enviarEmail("registro_aprobado",user.correo,user.nombre);
  }

  RechazarCliente(user){
    //console.log("Borrando usuario");
    this.fire.BorrarUno(user);
    this.enviarEmail("registro_rechazado",user.correo,user.nombre);
  }
  


  enviarEmail(templateID: string, correo: string, nombre: string){
    let templateParams = {
      correoDestinatario: correo,
      nombreDestinatario: nombre
    };
    emailjs.send("gmail", templateID, templateParams)
    .then(res => console.log("Correo enviado.", res.status, res.text))
    .catch(error => console.log("Error al enviar.", error));
  }

  LanzarNotificacion(numeroId:number){
    this.localNotifications.schedule([{
      id: numeroId,
      title:'El Mazacote',
      text: 'Nuevo cliente en lista',
      sound:'file://assets/mp3/notificacion.mp3',
     }]);
     
  }

  

}
