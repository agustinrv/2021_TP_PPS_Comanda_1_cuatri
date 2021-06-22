import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalDetallesPedidosComponent } from '../modal-detalles-pedidos/modal-detalles-pedidos.component';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.page.html',
  styleUrls: ['./pedidos-pendientes.page.scss'],
})
export class PedidosPendientesPage implements OnInit {
  

  public listaPedidosRecibidos:Pedido[]=[];
  public listaPedidosPreparando:Pedido[]=[];
  public EestadoPedido=EestadoPedido;


  constructor(  
    private servicioPedido:PedidosService,
    private modalController:ModalController
) { }

  ngOnInit() {
    this.CargarPedidos();
  }
  

  private CargarPedidos()
  {
    this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosRecibidos=data;
    });

    this.servicioPedido.TraerPedidosPreparando().valueChanges().subscribe((data:Pedido[])=>{
        this.listaPedidosPreparando=data;
    })
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
