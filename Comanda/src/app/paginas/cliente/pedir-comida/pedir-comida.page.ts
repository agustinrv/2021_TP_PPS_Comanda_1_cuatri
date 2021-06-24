import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { Productos } from 'src/app/clases/Productos/productos';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { ActionSheetController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';


@Component({
  selector: 'app-pedir-comida',
  templateUrl: './pedir-comida.page.html',
  styleUrls: ['./pedir-comida.page.scss'],
})
export class PedirComidaPage implements OnInit {


  //Solicitud encontrada en la BD
  solicitudDeMesaEncontrada: any;

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
    private toastController: ToastController,
    private soliSvc: SolicitudMesaService,
    private actionSheetCtrl: ActionSheetController,
    private scanner: BarcodeScanner
  ) {
    this.pedido = new Pedido();
  }

  ngOnInit() {
    this.productosSvc.TraerTodos().valueChanges().subscribe(prod => {
      this.listadoProductos = prod;
    });

    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.userSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(user => {
      this.usuarioBD = user[0];
    });

    this.soliSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(soli => {
      //console.log(soli[0]);
      this.solicitudDeMesaEncontrada = soli[0];
    })

  }

  AgregarProducto(producto) {
    //let productoAux = new Productos();
    //Agrego datos importantes
    //Probando algo (NO FUNCIONO XD)
    /*productoAux.cantidad = producto.cantidad;
    productoAux.fotoUno = producto.fotoUno;
    productoAux.fotoDos = producto.fotoDos;
    productoAux.fotoTres = producto.fotoTres;
    productoAux.id = producto.id;
    productoAux.nombre = producto.nombre;
    productoAux.precio = producto.precio;
    productoAux.tiempoDeEspera = producto.tiempoDeEspera;
    productoAux.tipo = producto.tipo;*/


    this.pedido.cliente = this.usuarioBD;
    this.pedido.numMesa = this.solicitudDeMesaEncontrada.numMesa;
    this.pedido.estadoPedido = EestadoPedido.PedidoEnviadoCli;

    /*let productoEncontrado = false;
    this.pedido.listaProductos.forEach(prod => {
      if (prod.nombre == productoAux.nombre) {
        productoEncontrado = true;
      }
      else {
        productoEncontrado = false;
      }
    });*/

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
      const info = data['data'];
      if (info.componentProps.pedido.precioTotal != null) {
        this.precioDelPedido = info.componentProps.pedido.precioTotal;
      }
      this.pedido = info.componentProps.pedido;
      //Un sweet alert o un toast, para mostrar que se creo el pedido.
      //this.Toast("success","Pedido Realizado con exito!");
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

  ScanQRProductos() {
    let auxProd: any;

    this.scanner.scan().then(data => {
      auxProd = data["text"];
      let prodBDEncontrado: any;
      this.listadoProductos.forEach(prodBD => {
        if (prodBD.nombre == auxProd) {
          prodBDEncontrado = prodBD;
        }
      });
      this.presentActionSheet(prodBDEncontrado);
    });

  }

  async presentActionSheet(producto: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Eliga cantidad',
      cssClass: 'menuMesas',
      buttons: [{
        text: '1',
        role: '1',
        icon: 'caret-forward',
        handler: () => {
          this.AgregarCantidadProducto(1, producto);
        }
      }, {
        text: '2',
        role: '2',
        icon: 'caret-forward',
        handler: () => {
          this.AgregarCantidadProducto(2, producto);
        }
      }, {
        text: '3',
        role: '3',
        icon: 'caret-forward',
        handler: () => {
          this.AgregarCantidadProducto(3, producto);
        }
      }, {
        text: '4',
        role: '4',
        icon: 'caret-forward',
        handler: () => {
          this.AgregarCantidadProducto(4, producto);
        }
      }, {
        text: '5',
        role: '5',
        icon: 'caret-forward',
        handler: () => {
          this.AgregarCantidadProducto(5, producto);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: '1',
        handler: () => {
          this.Toast('dark', "Se cancelo!");
        }
      }]
    });

    await actionSheet.present();

    await actionSheet.onDidDismiss().then(data => {
      //console.log('Cantidad Seleccionada',data.role);
    });

  }

  AgregarCantidadProducto(cant, producto) {
    producto.cantidad = cant;
    this.AgregarProducto(producto);
  }

}
