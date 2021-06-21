import { EtipoMesa } from 'src/app/enumerados/EtipoMesa/etipo-mesa';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pedido } from 'src/app/clases/pedido/pedido';
import { Productos } from 'src/app/clases/Productos/productos';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';

@Component({
  selector: 'app-comp-modal-pedido',
  templateUrl: './comp-modal-pedido.component.html',
  styleUrls: ['./comp-modal-pedido.component.scss'],
})
export class CompModalPedidoComponent implements OnInit {

  @Input() pedidoSeleccionado:Pedido;  

  constructor(private modalController:ModalController,private servicioPedidos:PedidosService) { }

  ngOnInit() {
  }

  public CerrarModal(pedidoTerminado?:Pedido) {
    this.modalController.dismiss({
      'dismissed': true,
      //'pedidoTerminado':true,
      //'unpedido':pedidoTerminado
      //hay que hacer if de si esta el pedido o no y como cerrarlo
    });
  }
//eN HTML QUE SEA UN CHECK COMO EL DE LA PAGINA
  public TerminarProducto(nombreProducto:string)
  {
    for(let producto of this.pedidoSeleccionado.listaProductos)
    {
      if(producto.nombre==nombreProducto)
      {
        producto.terminado=true;
        break;
      }
    }
    
    this.servicioPedidos.ModificarUno(this.pedidoSeleccionado);    

      if(!this.QuedanPedidosSinTerminar())
      {   
          //Alert de que ya termino la parte del cocinero
          this.CerrarModal(this.pedidoSeleccionado);
      }
  
  }

  public QuedanPedidosSinTerminar():boolean
  {
    let encontroPedidoSinTerminar=false;
    this.pedidoSeleccionado.listaProductos.forEach(element => {
        if(!element.terminado)
        {
          encontroPedidoSinTerminar=true;
        }
    });

    return encontroPedidoSinTerminar;
  }

}
