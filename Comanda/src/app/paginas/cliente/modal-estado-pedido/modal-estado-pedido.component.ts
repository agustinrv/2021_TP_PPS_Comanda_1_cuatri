import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';

@Component({
  selector: 'app-modal-estado-pedido',
  templateUrl: './modal-estado-pedido.component.html',
  styleUrls: ['./modal-estado-pedido.component.scss'],
})
export class ModalEstadoPedidoComponent implements OnInit {

  @Input() pedidoSeleccionado:Pedido;  

  public colorBoton='dark';
  public EestadoPedido=EestadoPedido;
  public pedidoMostrar:Pedido;
  public porcentajeBarra="width: 0%";

  ///Estados
  public estadoDelPedido:ClaseEstadoPedido;


  constructor(private modalController:ModalController,private servicioPedido:PedidosService) 
  { 
      this.estadoDelPedido= new ClaseEstadoPedido();
  }

  ngOnInit() {
    this.servicioPedido.TraerUnPedidoID(this.pedidoSeleccionado.id).valueChanges().subscribe((data:Pedido[])=>{
      this.pedidoMostrar=data[0];
      this.CalcularEstadoPedido();
  });
  }

    
  public CerrarModal() {

    this.modalController.dismiss({
      'dismissed': true,
    });    

  }

  private CalcularEstadoPedido()
  {
    if(this.pedidoMostrar.estadoPedido==EestadoPedido.PedidoEnviadoCli)
    {
      
    }

    if(this.pedidoMostrar)

    switch (this.pedidoMostrar.estadoPedido) {
      case EestadoPedido.PedidoEnviadoCli:
        break;

      case EestadoPedido.Recibido:
        this.estadoDelPedido.confirmacionMozo=true;
        this.porcentajeBarra="width: 15%";
        break;

      case EestadoPedido.Preparando:

        this.estadoDelPedido.confirmacionMozo=true;
        this.estadoDelPedido.enPreparacion=true;
        this.porcentajeBarra='width: 25%';

        if(this.pedidoMostrar.BarTenderTermino)
        {
          this.estadoDelPedido.bartenderTermino=true;
          this.porcentajeBarra='width: 50%';
        }
        if(this.pedidoMostrar.CocineroTermino)
        {
          this.estadoDelPedido.cocineroTermino=true;
          this.porcentajeBarra='width: 50%';
        }

        if(this.pedidoMostrar.CocineroTermino && this.pedidoMostrar.BarTenderTermino)
        {
          this.porcentajeBarra='width: 90%';
        }

        break;

      case EestadoPedido.Terminado:

        this.estadoDelPedido.confirmacionMozo=true;
        this.estadoDelPedido.enPreparacion=true;
        this.estadoDelPedido.bartenderTermino=true;
        this.estadoDelPedido.cocineroTermino=true;
        this.estadoDelPedido.terminado=true;
        this.porcentajeBarra='width: 95%';
        break;

      case EestadoPedido.Entregado:
        this.estadoDelPedido.confirmacionMozo=true;
        this.estadoDelPedido.enPreparacion=true;
        this.estadoDelPedido.bartenderTermino=true;
        this.estadoDelPedido.cocineroTermino=true;
        this.estadoDelPedido.terminado=true;
        this.estadoDelPedido.entregado=true;
        this.colorBoton='warning'

        this.porcentajeBarra='width: 100%';
      break;
      
    }
  }

}

export class ClaseEstadoPedido{
  public confirmacionMozo:boolean=false;
  public enPreparacion:boolean=false;
  public bartenderTermino:boolean=false;
  public cocineroTermino:boolean=false;
  public terminado:boolean=false;
  public entregado:boolean=false;

}
