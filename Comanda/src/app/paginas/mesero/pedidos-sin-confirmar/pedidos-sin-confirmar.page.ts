import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { Eperfil } from 'src/app/enumerados/Eperfil/eperfil';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalPedidosSinConfirmarComponent } from '../modal-pedidos-sin-confirmar/modal-pedidos-sin-confirmar.component';

@Component({
  selector: 'app-pedidos-sin-confirmar',
  templateUrl: './pedidos-sin-confirmar.page.html',
  styleUrls: ['./pedidos-sin-confirmar.page.scss'],
})
export class PedidosSinConfirmarPage implements OnInit {


  public listaPedidosSinConfirmar:Pedido[]=[];
  
  public EestadoPedido=EestadoPedido;
  public perfil=Eperfil;

  public cantPedidos:number;

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
      this.servicioPedido.TraerPedidosPorEstado(EestadoPedido.PedidoEnviadoCli).valueChanges().subscribe((data:Pedido[])=>{
          this.listaPedidosSinConfirmar=data;

          if(!this.cargoPedidos)
          {
            this.cantPedidos=this.listaPedidosSinConfirmar.length;
            this.cargoPedidos=true;
          }
    
          if(this.cantPedidos<this.listaPedidosSinConfirmar.length)
          {
             this.LanzarNotificacion(this.listaPedidosSinConfirmar.length);
          }
      });
  }




  public async SeleccionarPedido(unPedido?:Pedido)
  {
    const modal = await this.modalController.create({
      component: ModalPedidosSinConfirmarComponent,
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
      text: 'Nuevo pedido sin confirmar',
      sound:'file://assets/mp3/notificacion.mp3',
     }]);
     
  }


}
