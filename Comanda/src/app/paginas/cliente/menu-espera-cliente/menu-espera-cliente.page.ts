import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Encuesta } from 'src/app/clases/Encuesta/encuesta';
import { EncuestaService } from 'src/app/servicios/encuesta/encuesta.service';
import { PideCuentaPage } from '../pide-cuenta/pide-cuenta.page'; 

@Component({
  selector: 'app-menu-espera-cliente',
  templateUrl: './menu-espera-cliente.page.html',
  styleUrls: ['./menu-espera-cliente.page.scss'],
})
export class MenuEsperaClientePage implements OnInit {

  titulo : string = "Encuesta";
  ruta : string = "/encuesta-cliente";
  imagen : string = "assets/cliente/encuesta.svg";

  constructor(private encuestaSvc : EncuestaService,private modalController : ModalController) 
  { 

  }

   ngOnInit() {

    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    let fecha : Date = new Date();
    

    this.encuestaSvc.TraerTodos().valueChanges().subscribe(encuestas=>{
      encuestas.forEach((element:Encuesta)=>{
        
        if(element.email == user.correo && element.fecha == fecha.toLocaleDateString())
        {
          this.titulo = "Estadisticas";
          this.ruta = "/graficos-cliente";
          this.imagen = "assets/cliente/estadistica.svg";
        }
        
      })
    })
 
  } 
  


  async ModalPedirCuenta() {
    const modal = await this.modalController.create({
      component: PideCuentaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
