import { Component, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { Productos } from 'src/app/clases/Productos/productos';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { ModalController } from '@ionic/angular';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';


@Component({
  selector: 'app-pedir-comida',
  templateUrl: './pedir-comida.page.html',
  styleUrls: ['./pedir-comida.page.scss'],
})
export class PedirComidaPage implements OnInit {

  listadoProductos : any = [];

  //Pedido
  pedido : Pedido;
  precioDelPedido : number = 0;

  //Info del usuario
  usuarioLogeado : any;
  usuarioBD : any;


  //Auxiliares del producto
  @ViewChild('Cantidad') selectCantidad : any;
  cantidadAux = 1;


  constructor(
    private productosSvc : ProductosService,
    private userSvc : UsuarioService,
    private modalCtrl : ModalController
  ) { 
    this.pedido = new Pedido();
  }

  ngOnInit() {
    this.productosSvc.TraerTodos().valueChanges().subscribe( prod =>{
      console.log(prod);
      this.listadoProductos = prod;
    });

    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.userSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe( user =>{
      this.usuarioBD = user[0];
    });
  }

  AgregarProducto(producto){
    this.pedido.listaProductos.push(producto);
    for(let i = 0; i < producto.cantidad; i++){
      this.precioDelPedido += parseInt(producto.precio);
    }
  }

  ElegirCantidad(producto){
    producto.cantidad = this.cantidadAux;
    //const value = this.selectCantidad.value;
    //producto.cantidad = value;
    console.log(producto);
  }

  ConfirmarPedido(){
    this.pedido.cliente = this.usuarioBD;
    //Mandar a la BD
  }

  async modalPedido(){
    const modal = await this.modalCtrl.create({
      component: ModalPedidoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        'pedido' : this.pedido
      },
      swipeToClose: true
    });
    return await modal.present();
  }

  

}
