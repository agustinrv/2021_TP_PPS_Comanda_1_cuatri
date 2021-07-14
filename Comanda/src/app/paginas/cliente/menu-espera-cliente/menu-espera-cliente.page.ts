import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Encuesta } from 'src/app/clases/Encuesta/encuesta';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { EncuestaService } from 'src/app/servicios/encuesta/encuesta.service';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
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
  listaPedidos : any = [];
  usuarioLogeado : any;
  SolicitudDeMesaEnBD : any;
  constructor(private encuestaSvc : EncuestaService,private modalController : ModalController, private pedidoSvc : PedidosService, 
    private soliSvc: SolicitudMesaService,
    private router: Router) 
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

    this.pedidoSvc.TraerPedidosDeUnCliente(user.correo).valueChanges().subscribe((data: Pedido[]) => {
      this.listaPedidos = data.filter((value) => {
        return value.estadoPedido == EestadoPedido.ConfirmarRecibido;
      });
    });
    
    this.soliSvc.TraerUno(user.correo).valueChanges().subscribe(user => {
      this.SolicitudDeMesaEnBD = user;
      if (this.SolicitudDeMesaEnBD.length == 0) {
        this.router.navigateByUrl('home-cliente');
        this.ngOnDestroy();
      }
    });
  } 
  
  ngOnDestroy(){

  }


  async ModalPedirCuenta() {
    const modal = await this.modalController.create({
      component: PideCuentaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
