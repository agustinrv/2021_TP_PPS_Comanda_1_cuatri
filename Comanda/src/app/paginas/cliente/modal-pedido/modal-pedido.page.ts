import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';


@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {

  @Input() pedido : any;
  algo = "so feo";

  constructor(
    private modalCtrl : ModalController,
    private PedidoSvc : PedidosService) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      componentProps: {
        'pedido': this.pedido
      }
    })
  }

  ConfirmarCompra(){
    let comidaEncontrada = false;
    let bebidaEncontrada = false;
    let tiempoAux = 0;

    this.pedido.listaProductos.forEach(element => {
      if(element.tipo == "comida" || element.tipo == "postre"){
        comidaEncontrada = true;
      }
      else if(element.tipo == "bebida"){
        bebidaEncontrada = true;
      }

      if(element.tiempoDeEspera > tiempoAux){
        tiempoAux = element.tiempoDeEspera;
      }
    });

    if(comidaEncontrada){
      this.pedido.CocineroTermino = false;
    }

    if(bebidaEncontrada){
      this.pedido.BarTenderTermino = false;
    }

    this.pedido.tiempoEstimadoTotal = tiempoAux;
    this.pedido.estadoPedido = EestadoPedido.Recibido;
    //this.PedidoSvc.AgregarUno(this.pedido);
    //Limpio el Pedido, para pueda crear otro nuevo si desea.
    this.pedido = new Pedido();
    this.dismiss();
  }

}
