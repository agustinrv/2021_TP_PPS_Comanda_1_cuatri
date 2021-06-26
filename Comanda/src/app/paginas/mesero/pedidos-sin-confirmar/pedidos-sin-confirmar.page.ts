import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalDetallesPedidosComponent } from '../modal-detalles-pedidos/modal-detalles-pedidos.component';

@Component({
  selector: 'app-pedidos-sin-confirmar',
  templateUrl: './pedidos-sin-confirmar.page.html',
  styleUrls: ['./pedidos-sin-confirmar.page.scss'],
})
export class PedidosSinConfirmarPage implements OnInit {


  public listaPedidosSinConfirmar:Pedido[]=[];
  
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
      this.servicioPedido.TraerPedidosPorEstado(EestadoPedido.PedidoEnviadoCli).valueChanges().subscribe((data:Pedido[])=>{
          this.listaPedidosSinConfirmar=data;
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
