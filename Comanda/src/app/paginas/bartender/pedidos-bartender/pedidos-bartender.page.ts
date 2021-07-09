import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';
import { Eperfil } from 'src/app/enumerados/Eperfil/eperfil';


@Component({
  selector: 'app-pedidos-bartender',
  templateUrl: './pedidos-bartender.page.html',
  styleUrls: ['./pedidos-bartender.page.scss'],
})
export class PedidosBartenderPage implements OnInit,OnDestroy {

  public listaPedidosRecibidos:Pedido[]=[];
  public listaPedidosPreparando:Pedido[]=[];

  public cantPedidosRecibidos:number;
  public cantPedidosPreparando:number;

  public cargoPedidosRecibidos=false;
  public cargoPedidosPreparando=false;

  public EestadoPedido:EestadoPedido=EestadoPedido.Recibido;
  public perfil=Eperfil;



  //sUBSCRIBE


  public subscribePedidosRecibidos;
  public subscribePedidosPreparados;

  constructor(private servicioPedido:PedidosService,
              private modalController: ModalController,
              private auth: AuthService,
              private router:Router,
              private localNotifications:LocalNotifications) { 

  }

  ngOnInit() {
      this.CargarPedidos();
  }

  ngOnDestroy() {
    this.subscribePedidosRecibidos.unsubscribe();
    this.subscribePedidosPreparados.unsubscribe();
    
  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
    this.ngOnDestroy();
  }


  private CargarPedidos()
  {
    this.subscribePedidosRecibidos=this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosRecibidos=data.filter((value,index,array)=>{
        return value.BarTenderTermino==false;
      });

      if(!this.cargoPedidosRecibidos)
      {
        this.cantPedidosRecibidos=this.listaPedidosRecibidos.length;
        this.cargoPedidosRecibidos=true;
      }
      
      if(this.cantPedidosRecibidos<this.listaPedidosRecibidos.length)
      {
          this.LanzarNotificacion(this.listaPedidosRecibidos[0].numMesa);
      }

    });

    this.subscribePedidosPreparados=this.servicioPedido.TraerPedidosPreparando().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosPreparando=data.filter((value,index,array)=>{
        return value.BarTenderTermino==false;
      });

      if(!this.cargoPedidosPreparando)
      {
        this.cantPedidosPreparando=this.listaPedidosRecibidos.length;
        this.cargoPedidosPreparando=true;
      }

      if(this.cantPedidosRecibidos<this.listaPedidosRecibidos.length)
      {
          this.LanzarNotificacion(this.listaPedidosRecibidos[0].numMesa);
      }

    });
  }


  LanzarNotificacion(numeroId:number){
    this.localNotifications.schedule([{
      id: 20000,
      title:'El Mazacote',
      text: 'Nuevo pedido para preparar',
      //icon: "file://assets/ic_notifications.png",
      //smallIcon:"file://assets/ic_notification_small.png",
     }]);
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
