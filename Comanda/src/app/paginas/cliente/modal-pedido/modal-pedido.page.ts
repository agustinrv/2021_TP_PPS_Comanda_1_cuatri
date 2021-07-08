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
  tiempoEstimado = 0;

  constructor(
    private modalCtrl : ModalController,
    private PedidoSvc : PedidosService) { }

  ngOnInit() {
    this.CalcularTiempoEstimado();
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
    this.pedido.estadoPedido = EestadoPedido.PedidoEnviadoCli;
    console.log(this.pedido);
    this.PedidoSvc.AgregarUno(this.pedido);
    //Limpio el Pedido, para pueda crear otro nuevo si desea.
    this.pedido = new Pedido();
    this.pedido.precioTotal = 0;

    this.Reproducir('assets/mp3/nuevo_pedido.mp3');


    this.dismiss();
  }

  public Reproducir (pathSonido:string) {
    
    
    let audio = new Audio();
    console.log(pathSonido);
    audio.src = pathSonido;
    
    audio.load();
    audio.play();
    
  }

  BorrarProducto(producto){
    for(let i = 0; i < this.pedido.listaProductos.length; i++){
      if(producto.nombre == this.pedido.listaProductos[i].nombre){
        this.pedido.precioTotal -= this.pedido.listaProductos[i].precio * this.pedido.listaProductos[i].cantidad;
      
        this.pedido.listaProductos.splice(i,1);
      }
    }
    this.CalcularTiempoEstimado();
  }

  CalcularTiempoEstimado(){
    this.tiempoEstimado = 0;
    this.pedido.listaProductos.forEach(producto => {
      if(producto.tiempoDeEspera > this.tiempoEstimado){
        this.tiempoEstimado = producto.tiempoDeEspera;
      }
    });
  }
}
