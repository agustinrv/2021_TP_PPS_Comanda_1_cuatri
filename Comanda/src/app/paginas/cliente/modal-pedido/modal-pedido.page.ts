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
    //console.log(this.pedido);
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
    console.log(this.pedido);
    this.PedidoSvc.AgregarUno(this.pedido);
    //Limpio el Pedido, para pueda crear otro nuevo si desea.
    this.pedido = new Pedido();
    this.pedido.precioTotal = 0;
    this.dismiss();
  }

  BorrarProducto(producto){
    for(let i = 0; i < this.pedido.listaProductos.length; i++){
      if(producto.nombre == this.pedido.listaProductos[i].nombre){
        this.pedido.precioTotal -= this.pedido.listaProductos[i].precio * this.pedido.listaProductos[i].cantidad;
      
        this.pedido.listaProductos.splice(i,1);
      }
    }
  }

}
