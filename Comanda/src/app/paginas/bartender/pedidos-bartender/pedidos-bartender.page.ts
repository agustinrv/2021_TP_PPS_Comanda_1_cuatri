import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-bartender',
  templateUrl: './pedidos-bartender.page.html',
  styleUrls: ['./pedidos-bartender.page.scss'],
})
export class PedidosBartenderPage implements OnInit {

  public listaPedidosRecibidos:Pedido[]=[];
  public listaPedidosPreparando:Pedido[]=[];

  public EestadoPedido:EestadoPedido=EestadoPedido.Recibido;
  constructor(private servicioPedido:PedidosService,
              private modalController: ModalController,
              private auth: AuthService,private router:Router) { 

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
    });

    this.servicioPedido.TraerPedidosPreparando().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosPreparando=data.filter((value,index,array)=>{
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
