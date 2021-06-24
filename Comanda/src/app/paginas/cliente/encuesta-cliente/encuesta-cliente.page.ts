import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Encuesta } from 'src/app/clases/Encuesta/encuesta';
import { Usuario } from 'src/app/clases/Usuario/usuario';

@Component({
  selector: 'app-encuesta-cliente',
  templateUrl: './encuesta-cliente.page.html',
  styleUrls: ['./encuesta-cliente.page.scss'],
})
export class EncuestaClientePage implements OnInit {


  resenia : string = "";
  fecha : Date = new Date();
  encuesta : Encuesta = new Encuesta();
  usuario : Usuario = new Usuario();


  rango : any;
  radio1: any;
  radio2: any;

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    
    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    
    this.usuario.nombre = user.nombre;
    this.usuario.correo = user.correo;

  }

  rangoEvento(event :any)
  {
    this.rango = event.detail.value;
  }

  radioEvento1(event:any)
  {
    this.radio1 = event.detail.value;
  }

  radioEvento2(event:any)
  {
    this.radio2 = event.detail.value;
  }

  enviarEncuesta()
  {
    if(this.rango!=null && this.radio1 != null && this.radio2 != null)
    {
      this.encuesta.nombre = this.usuario.nombre;
      this.encuesta.email = this.usuario.correo;
      this.encuesta.pregunta1 = this.rango;
      this.encuesta.pregunta2 = this.radio1;
      this.encuesta.pregunta3 = this.radio2;
      this.encuesta.fecha = this.fecha.toLocaleDateString();
      this.encuesta.resenia = this.resenia;

      
    }
    else
    {
      this.Toast('warning', 'Debe completar al encuesta para poder enviarla!');
    }
  }

  async Toast(color: string, mensaje: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      color: color,
      position: 'top'

    });
    toast.present();
  }

}
