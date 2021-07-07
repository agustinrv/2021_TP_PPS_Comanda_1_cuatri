import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { Eperfil } from 'src/app/enumerados/Eperfil/eperfil';
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

  public cantPedidos:number;
  public perfil=Eperfil;

  public cargoPedidos=false;


  constructor(  
    private servicioPedido:PedidosService,
    private modalController:ModalController,
    private localNotifications:LocalNotifications
) { }

  ngOnInit() {
    this.CargarPedidos();
  }
  

  private CargarPedidos()
  {

    this.servicioPedido.TraerPedidosTerminado().valueChanges().subscribe((data:Pedido[])=>{
        this.listaPedidosTerminados=data;

        
        if(!this.cargoPedidos)
        {
          this.cantPedidos=this.listaPedidosTerminados.length;
          this.cargoPedidos=true;
        }
  
        if(this.cantPedidos<this.listaPedidosTerminados.length)
        {
           this.LanzarNotificacion(this.listaPedidosTerminados.length);
        }
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

  public LanzarNotificacion(numeroId:number){
    this.localNotifications.schedule([{
      id: numeroId,
      title:'El Mazacote',
      text: 'Nuevo pedido Finalizado',
      sound:'file://assets/mp3/notificacion.mp3',
     }]);
     
  }


}
