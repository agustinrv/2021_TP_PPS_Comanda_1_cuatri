import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { MsgConsultaService } from 'src/app/servicios/msgConsulta/msg-consulta.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-chat-mesero',
  templateUrl: './chat-mesero.page.html',
  styleUrls: ['./chat-mesero.page.scss'],
})
export class ChatMeseroPage implements OnInit {

  ///Info del usurio
  usuarioLogeado : any;
  usuarioDeBD : any;

  //Mensaje
  listadoMsg : any;
  newMsg = '';

  @Input() numMesa : any;


  @ViewChild(IonContent) content: IonContent;

  constructor(
    private modalCtrl : ModalController,
    private userSvc : UsuarioService,
    private msgSvc : MsgConsultaService
  ) { }

  ngOnInit() {
    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.userSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(user =>{
      this.usuarioDeBD = user[0];
    });

    this.msgSvc.TraerChat().valueChanges().subscribe(msgs => {
      this.listadoMsg = msgs;
      this.MarcarComoLeido();
    });
  }

  MarcarComoLeido(){
    this.listadoMsg.forEach(msg => {
      if(msg.mesa == this.numMesa && msg.estado == "EnviadoCliente"){
        msg.estado = "LeidoMozo";
      }
    });
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      componentProps: {
        'pedido': "otro hola"
      }
    })
  }

  EnviarMsg(){
    let msgNuevo = {
      usuario: "Mozo",
      fecha: new Date().getTime(),
      msg: this.newMsg,
      mesa: this.numMesa,
      estado : "EnviadoMozo"
    }

    this.msgSvc.CrearMsgRT(msgNuevo);

    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
    console.log(this.listadoMsg);
  }
}
