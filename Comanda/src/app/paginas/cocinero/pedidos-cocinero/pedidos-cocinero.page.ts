import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { CompModalPedidoComponent } from '../comp-modal-pedido/comp-modal-pedido.component';

@Component({
  selector: 'app-pedidos-cocinero',
  templateUrl: './pedidos-cocinero.page.html',
  styleUrls: ['./pedidos-cocinero.page.scss'],
})
export class PedidosCocineroPage implements OnInit {

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
        return value.CocineroTermino==false;
      });
    });
  }

  public async SeleccionarPedido(unPedido?:Pedido)
  {
    const modal = await this.modalController.create({
      component: CompModalPedidoComponent,
      componentProps: {
        'pedidoSeleccionado': unPedido,
      }
    });
    await modal.present();
  }


}
