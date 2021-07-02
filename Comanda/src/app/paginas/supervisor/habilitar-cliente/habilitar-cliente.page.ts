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
  
  listadoUsuarios : any;

  constructor(
    private fire: UsuarioService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.fire.TraerTodos().valueChanges().subscribe((users)=>{
      console.log(users);
      this.listadoUsuarios = users;
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

  

}
