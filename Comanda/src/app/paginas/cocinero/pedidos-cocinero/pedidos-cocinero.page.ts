import { EestadoPedido } from './../../../enumerados/EestadoPedido/eestado-pedido';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';

@Component({
  selector: 'app-pedidos-cocinero',
  templateUrl: './pedidos-cocinero.page.html',
  styleUrls: ['./pedidos-cocinero.page.scss'],
})
export class PedidosCocineroPage implements OnInit {

  public listaPedidos:Pedido[]=[];
  public EestadoPedido:EestadoPedido=EestadoPedido.Recibido
  constructor(private servicioPedido:PedidosService) { 

  }

  ngOnInit() {
      this.CargarPedidos();
  }

  public CargarPedidos()
  {
    this.servicioPedido.TraerPedidosRecibidos().valueChanges().subscribe((data:Pedido[])=>{
      this.listaPedidos=data;
    });
  }



}
