import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { Productos } from 'src/app/clases/Productos/productos';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-pedidos-sin-confirmar',
  templateUrl: './modal-pedidos-sin-confirmar.component.html',
  styleUrls: ['./modal-pedidos-sin-confirmar.component.scss'],
})
export class ModalPedidosSinConfirmarComponent implements OnInit {

  @Input() pedidoSeleccionado:Pedido;  

  public colorBoton;
  public EestadoPedido=EestadoPedido;


  constructor(private modalController:ModalController,
              private servicioPedidos:PedidosService) { }

  ngOnInit() {
      
  }

  
  public CerrarModal() {

    this.modalController.dismiss({
      'dismissed': true,
    });    

  }
  
  public ConfirmarPedido()
  {
    this.Confirmar('Confirmar Pedido?','','Si,Continuar').then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire(
          'Confirmado!!',
          '',
          'success'
          )
        this.pedidoSeleccionado.estadoPedido=EestadoPedido.Recibido;
        this.servicioPedidos.ModificarUno(this.pedidoSeleccionado);
        this.CerrarModal();
      }
      
    });
    
  }

  public NoConfirmarPedido(){
      this.Confirmar('Si no confirma el elemento se eliminara',"Desea continuar?",'Si,Eliminalo').then((result) => {
      if (result.isConfirmed) {
        this.servicioPedidos.BorrarUno(this.pedidoSeleccionado);  
        Swal.fire(
          'Eliminado',
          'El cliente debe volver a cargar el pedido',
          'success'
          );
          this.CerrarModal();
      }
    });

  }

  public QuitarProducto(unProducto:Productos)
  {
      let input=document.getElementById('item_'+unProducto.id);
      input.className='QuitarElemento';
           
     setTimeout(() => {
      this.pedidoSeleccionado.listaProductos=this.pedidoSeleccionado.listaProductos.filter((value,index,array)=>{
        return value.nombre!=unProducto.nombre;
       })
      this.servicioPedidos.ModificarUno(this.pedidoSeleccionado);
     },500);
      
  } 

  public Confirmar(titulo:string,texto:string,botonConfirmar:string){
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3ca841',
      cancelButtonColor: '#d33',
      confirmButtonText: botonConfirmar,
      cancelButtonText: 'Cancelar'
    });

  }
}
