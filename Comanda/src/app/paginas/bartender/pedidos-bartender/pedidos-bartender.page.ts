import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';

@Component({
  selector: 'app-pedidos-bartender',
  templateUrl: './pedidos-bartender.page.html',
  styleUrls: ['./pedidos-bartender.page.scss'],
})
export class PedidosBartenderPage implements OnInit {

  public listaPedidos:Pedido[]=[];
  public EestadoPedido:EestadoPedido=EestadoPedido.Recibido;
  constructor(private servicioPedido:PedidosService,
              private modalController: ModalController) { 

  }

  ngOnInit() {
      this.CargarPedidos();
  }

  private CargarPedidos()
  {
    this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidos=data.filter((value,index,array)=>{
        return value.BarTenderTermino==false;
      });
    });
  }

  public async SeleccionarPedido(unPedido?:Pedido)
  {
    const modal = await this.modalController.create({
      component: ModalPedidoComponent,
      componentProps: {
        'pedidoSeleccionado': unPedido,
      }
    });
    await modal.present();
  }

}
