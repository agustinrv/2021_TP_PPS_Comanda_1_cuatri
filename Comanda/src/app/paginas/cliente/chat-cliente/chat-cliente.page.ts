import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { MsgConsultaService } from 'src/app/servicios/msgConsulta/msg-consulta.service';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-chat-cliente',
  templateUrl: './chat-cliente.page.html',
  styleUrls: ['./chat-cliente.page.scss'],
})
export class ChatClientePage implements OnInit {

  ///Datos del usuario ingresado
  usuarioLogeado : any;
  usuarioDeBD : any;
  solicitudDeMesaEncontrada: any;

  //Listado de Mensajes
  listadoMsg : any;

  newMsg = '';

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private userSvc : UsuarioService,
    private msgSvc : MsgConsultaService,
    private soliSvc : SolicitudMesaService
  ) { }

  ngOnInit() {
    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    //this.mesaAsignada = JSON.parse(localStorage.getItem('MesaDeUsuario'));
    this.userSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(user =>{
      this.usuarioDeBD = user[0];
    });

    this.soliSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe( data =>{
      this.solicitudDeMesaEncontrada = data[0];
    });

    this.msgSvc.TraerChat().valueChanges().subscribe( async(msgs) =>{
      this.listadoMsg = msgs;
      await this.MarcarComoLeido();
    });
  }

  EnviarMsg(){
    let msgNuevo = {
      usuario: this.usuarioDeBD.nombre,
      fecha: new Date().getTime(),
      msg: this.newMsg,
      mesa: this.solicitudDeMesaEncontrada.numMesa,
      estado : "EnviadoCliente"
    }

    this.msgSvc.CrearMsgRT(msgNuevo);

    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

  MarcarComoLeido(){
    this.listadoMsg.forEach(msg => {
      if(msg.mesa == this.solicitudDeMesaEncontrada.numMesa && msg.estado == "EnviadoMozo"){
        msg.estado = "LeidoCliente";
        this.msgSvc.ModificarMsg(msg);
      }
    });
  }

}
