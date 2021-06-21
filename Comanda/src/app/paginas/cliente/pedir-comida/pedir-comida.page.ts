import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { Productos } from 'src/app/clases/Productos/productos';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';


@Component({
  selector: 'app-pedir-comida',
  templateUrl: './pedir-comida.page.html',
  styleUrls: ['./pedir-comida.page.scss'],
})
export class PedirComidaPage implements OnInit {

  listadoProductos: any = [];

  //Pedido
  pedido: Pedido;
  precioDelPedido: number = 0;

  //Info del usuario
  usuarioLogeado: any;
  usuarioBD: any;


  //Auxiliares del producto
  @ViewChild('Cantidad') selectCantidad: any;
  cantidadAux = "";


  constructor(
    private productosSvc: ProductosService,
    private userSvc: UsuarioService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    this.pedido = new Pedido();
  }

  ngOnInit() {
    this.productosSvc.TraerTodos().valueChanges().subscribe(prod => {
      //console.log(prod);
      this.listadoProductos = prod;
    });

    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.userSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(user => {
      this.usuarioBD = user[0];
    });
  }

  AgregarProducto(producto) {
    this.pedido.cliente = this.usuarioBD;
    if (!this.pedido.listaProductos.includes(producto)) {
      this.pedido.listaProductos.push(producto);
      for (let i = 0; i < producto.cantidad; i++) {
        this.precioDelPedido += parseInt(producto.precio);
      }
      this.pedido.precioTotal = this.precioDelPedido;
    }
    else {
      this.Toast("dark", "Ya esta agregado el pedido!");
    }
  }

  async modalPedido() {
    const modal = await this.modalCtrl.create({
      component: ModalPedidoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'pedido': this.pedido
      }
    });
    modal.onDidDismiss().then((data) => {
      const info = data['data']
      this.precioDelPedido = 0;
      this.pedido = info.componentProps.pedido;
      //Un sweet alert o un toast, para mostrar que se creo el pedido.
    })

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
