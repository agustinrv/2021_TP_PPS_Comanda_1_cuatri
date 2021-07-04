import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { DetallesPedidosPage } from '../detalles-pedidos/detalles-pedidos.page';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.page.html',
  styleUrls: ['./confirmar-pago.page.scss'],
})
export class ConfirmarPagoPage implements OnInit {

  usuarioLogeado: any;
  listaMesas: any;
  listaPedidos: any;
  listaSolicitudes: any;

  constructor(
    private mesaSvc: MesaService,
    private pedidoSvc: PedidosService,
    private modalController: ModalController,
    private toastController: ToastController,
    private soliSvc: SolicitudMesaService
  ) { }

  ngOnInit() {
    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.CargarMesas();
    this.CargarPedidos();
    this.CargarSolicitudes();
  }

  private CargarMesas() {
    this.mesaSvc.TraerTodos().valueChanges().subscribe(mesas => {
      this.listaMesas = mesas;
    });
  }

  private CargarPedidos() {
    this.pedidoSvc.TraerTodos().valueChanges().subscribe(pedidos => {
      this.listaPedidos = pedidos;
    })
  }

  private CargarSolicitudes() {
    this.soliSvc.TraerTodos().valueChanges().subscribe(solicitud => {
      this.listaSolicitudes = solicitud;
    })
  }

  

  ModificarMesa(mesa: any) {
    mesa.listaProductos = [];
    mesa.pagado = false;
    mesa.precioPagado = 0;
    mesa.propina = 0;
    mesa.asignada = false;
    mesa.cliente = {};
    //Juegos
    mesa.gano1 = false;
    mesa.gano2 = false;
    mesa.gano3 = false;
    mesa.juego1 = false;
    mesa.juego2 = false;
    mesa.juego3 = false;
    this.mesaSvc.ModificarUno(mesa);
    this.Toast('success','Pago aceptado con exito!');
  }

  

  EliminarPedidos(mesa) {
    this.listaPedidos.forEach(pedido => {
      if(mesa.cliente.correo == pedido.cliente.correo){
        this.pedidoSvc.BorrarUno(pedido);
      }
    });
    this.EliminarSolicitudMesa(mesa);
    this.ModificarMesa(mesa);
  }

  EliminarSolicitudMesa(mesa){
    this.listaSolicitudes.forEach(soli => {
      if(mesa.cliente.correo == soli.cliente.correo){
        this.soliSvc.BorrarUno(soli);
      }
    });
  }


  async ModalDetalles(mesa) {
    const modal = await this.modalController.create({
      component: DetallesPedidosPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'mesaInfo': mesa
      }
    });
    return await modal.present();
  }

  async Toast(color: string, mensaje: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
