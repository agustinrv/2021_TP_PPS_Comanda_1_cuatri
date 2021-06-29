import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-detalles-pedidos',
  templateUrl: './modal-detalles-pedidos.component.html',
  styleUrls: ['./modal-detalles-pedidos.component.scss'],
})
export class ModalDetallesPedidosComponent implements OnInit {

  @Input() pedidoSeleccionado:Pedido;  

  public colorBoton;
  public EestadoPedido=EestadoPedido;


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

  public QuedanPedidosSinTerminar():boolean
  {
    let tienePedidosSinTerminar=true;
    
    if(this.pedidoSeleccionado.BarTenderTermino && this.pedidoSeleccionado.CocineroTermino)
    {
      tienePedidosSinTerminar=false;
    }

    return tienePedidosSinTerminar;
  }
  public CancelarPedido(){
    this.Confirmar('Si lo cancela no podra recuperarlo',"Desea continuar?",'Si,Eliminalo').then((result) => {
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


  public EntregarPedido(){
      this.pedidoSeleccionado.estadoPedido=EestadoPedido.Entregado;      
      this.servicioPedidos.ModificarUno(this.pedidoSeleccionado);
      this.CerrarModal();
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
