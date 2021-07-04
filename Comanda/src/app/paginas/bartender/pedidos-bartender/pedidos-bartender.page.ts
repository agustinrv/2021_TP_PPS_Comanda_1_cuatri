import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-pedidos-bartender',
  templateUrl: './pedidos-bartender.page.html',
  styleUrls: ['./pedidos-bartender.page.scss'],
})
export class PedidosBartenderPage implements OnInit {

  public listaPedidosRecibidos:Pedido[]=[];
  public listaPedidosPreparando:Pedido[]=[];

  public cantPedidosRecibidos:number;
  public cantPedidosPreparando:number;

  public cargoPedidosRecibidos=false;
  public cargoPedidosPreparando=false;

  public EestadoPedido:EestadoPedido=EestadoPedido.Recibido;
  constructor(private servicioPedido:PedidosService,
              private modalController: ModalController,
              private auth: AuthService,
              private router:Router,
              private localNotifications:LocalNotifications,
              private vibracion:Vibration) { 

  }

  ngOnInit() {
      this.CargarPedidos();
  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

  private CargarPedidos()
  {
    this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosRecibidos=data.filter((value,index,array)=>{
        return value.BarTenderTermino==false;
      });

      if(!this.cargoPedidosRecibidos)
      {
        this.cantPedidosRecibidos=this.listaPedidosRecibidos.length;
        this.cargoPedidosRecibidos=true;
      }
      
      if(this.cantPedidosRecibidos>this.listaPedidosRecibidos.length)
      {
          this.LanzarNotificacion(this.listaPedidosRecibidos[0].numMesa);
      }

    });

    this.servicioPedido.TraerPedidosPreparando().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosPreparando=data.filter((value,index,array)=>{
        return value.BarTenderTermino==false;
      });

      if(!this.cargoPedidosPreparando)
      {
        this.cantPedidosPreparando=this.listaPedidosRecibidos.length;
        this.cargoPedidosPreparando=true;
      }

      if(this.cantPedidosRecibidos>this.listaPedidosRecibidos.length)
      {
          this.LanzarNotificacion(this.listaPedidosRecibidos[0].numMesa);
      }

    });
  }


  LanzarNotificacion(numeroId:number){
    this.localNotifications.schedule([{
      id: numeroId,
      title:'El Mazacote',
      text: 'Nuevo pedido para preparar',
      sound:'assets/mp3/notificacion.mp3',
      icon: 'assets/splash/center.png'
     }]);
     this.vibracion.vibrate([300,300,300]);
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
