import { EtipoMesa } from 'src/app/enumerados/EtipoMesa/etipo-mesa';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pedido } from 'src/app/clases/pedido/pedido';
import { Productos } from 'src/app/clases/Productos/productos';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss'],
})
export class ModalPedidoComponent implements OnInit {

  @Input() pedidoSeleccionado:Pedido;  

  public colorBoton;


  constructor(private modalController:ModalController,
              private servicioPedidos:PedidosService) { }

  ngOnInit() {
      if(this.QuedanPedidosSinTerminar()){
        this.colorBoton='dark';
      }
      else{
        this.colorBoton='warning';
      }
  }

  public CerrarModal() {

    this.modalController.dismiss({
      'dismissed': true,
    });    

  }

  public CambiarEstado(nombreProducto:string)
  {
    for(let producto of this.pedidoSeleccionado.listaProductos)
    {
      if(producto.nombre==nombreProducto)
      {
        if(producto.terminado)
        {
          producto.terminado=false;
        }
        else{
          producto.terminado=true;
        }
        break;
      }
    }
    
    this.servicioPedidos.ModificarUno(this.pedidoSeleccionado);    

    if(!this.QuedanPedidosSinTerminar())
    {   
      this.colorBoton='warning';
    }
    else{
      this.colorBoton='dark';          
    }
  
  }

  public QuedanPedidosSinTerminar():boolean
  {
    let encontroPedidoSinTerminar=false;
    this.pedidoSeleccionado.listaProductos.filter((value, index,array)=>{
        return value.tipo=='bebida';
    }).forEach(element => {
        if(!element.terminado)
        {
          encontroPedidoSinTerminar=true;
        }
    });

    return encontroPedidoSinTerminar;
  }

  public FinalizarPedido(){
      this.pedidoSeleccionado.BarTenderTermino=true;

      if(this.pedidoSeleccionado.CocineroTermino)
      {
        this.pedidoSeleccionado.estadoPedido=EestadoPedido.Preparando;
        //push notificiacion???
      }
      this.servicioPedidos.ModificarUno(this.pedidoSeleccionado);
      this.CerrarModal();
  }

}
