import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalDetallesPedidosComponent } from '../modal-detalles-pedidos/modal-detalles-pedidos.component';

@Component({
  selector: 'app-pedidos-terminados',
  templateUrl: './pedidos-terminados.page.html',
  styleUrls: ['./pedidos-terminados.page.scss'],
})
export class PedidosTerminadosPage implements OnInit {

  public listaPedidosTerminados:Pedido[]=[];
  public EestadoPedido:EestadoPedido=EestadoPedido.Recibido;


  constructor(  
    private servicioPedido:PedidosService,
    private modalController:ModalController
) { }

  ngOnInit() {
    this.CargarPedidos();
  }
  

  private CargarPedidos()
  {

    this.servicioPedido.TraerPedidosTerminado().valueChanges().subscribe((data:Pedido[])=>{
        this.listaPedidosTerminados=data;
    });
  }

  

  

  public async SeleccionarPedido(unPedido?:Pedido)
  {
    const modal = await this.modalController.create({
      component: ModalDetallesPedidosComponent,
      componentProps: {
        'pedidoSeleccionado': unPedido,
      }
    });
    await modal.present();
  }


}
