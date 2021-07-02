import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { CompModalPedidoComponent } from '../comp-modal-pedido/comp-modal-pedido.component';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-cocinero',
  templateUrl: './pedidos-cocinero.page.html',
  styleUrls: ['./pedidos-cocinero.page.scss'],
})
export class PedidosCocineroPage implements OnInit {

  public listaPedidosRecibidos:Pedido[]=[];
  public listaPedidosPreparando:Pedido[]=[];
  public EestadoPedido=EestadoPedido;
  constructor(private servicioPedido:PedidosService,
              private modalController: ModalController,
              private auth: AuthService,
              private router:Router) { 

  }

  ngOnInit() {
      this.CargarPedidos();
  }

  private CargarPedidos()
  {
    this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosRecibidos=data.filter((value,index,array)=>{
        return value.CocineroTermino==false;
      });
    });

    this.servicioPedido.TraerPedidosPreparando().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidosPreparando=data.filter((value,index,array)=>{
         return value.CocineroTermino==false;
      })
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

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }


}
