import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { CompModalPedidoComponent } from '../comp-modal-pedido/comp-modal-pedido.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-pedidos-cocinero',
  templateUrl: './pedidos-cocinero.page.html',
  styleUrls: ['./pedidos-cocinero.page.scss'],
})
export class PedidosCocineroPage implements OnInit,OnDestroy {

  public listaPedidosRecibidos:Pedido[]=[];
  public listaPedidosPreparando:Pedido[]=[];
  public EestadoPedido=EestadoPedido;

  public cantPedidosRecibidos:number;
  public cantPedidosPreparando:number;

  public cargoPedidosRecibidos=false;
  public cargoPedidosPreparando=false;

  //subscribe

  public subscribePedidosRecibidos;
  public subscribePedidosPreparados;



  constructor(private servicioPedido:PedidosService,
              private modalController: ModalController,
              private auth: AuthService,
              private router:Router,
              private localNotifications:LocalNotifications
              ) { 

  }

  ngOnInit() {
      this.CargarPedidos();
  }

  ngOnDestroy() {
    this.subscribePedidosRecibidos.unsubscribe();
    this.subscribePedidosPreparados.unsubscribe();
    
  }


  private CargarPedidos()
  {
    this.subscribePedidosRecibidos= this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosRecibidos=data.filter((value,index ,array)=>{
        return value.CocineroTermino==false;
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

    this.subscribePedidosPreparados=this.servicioPedido.TraerPedidosPreparando().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosPreparando=data.filter((value,index,array)=>{
         return value.CocineroTermino==false;
      })
      
      if(!this.cargoPedidosPreparando)
      {
        this.cantPedidosPreparando=this.listaPedidosRecibidos.length;
        this.cargoPedidosPreparando=true;
      }

      if(this.cantPedidosRecibidos>this.listaPedidosRecibidos.length)
      {
          this.LanzarNotificacion(this.listaPedidosRecibidos[0].numMesa);
      }


    })
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

  LanzarNotificacion(numeroId:number){
    this.localNotifications.schedule([{
      id: numeroId,
      title:'El Mazacote',
      text: 'Nuevo pedido para preparar',
      sound:'../../../../assets/mp3/notificacion.mp3',
      icon: '../../../../assets/splash/center.png'
     }]);
     
  }

  public CerrarSesion(){
   
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
    this.ngOnDestroy();
    
  }

 

}
