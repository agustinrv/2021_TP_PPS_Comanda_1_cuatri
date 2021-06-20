import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-pedir-comida',
  templateUrl: './pedir-comida.page.html',
  styleUrls: ['./pedir-comida.page.scss'],
})
export class PedirComidaPage implements OnInit {

  listadoProductos : any = [];

  constructor(
    private productosSvc : ProductosService
  ) { }

  ngOnInit() {
    this.productosSvc.TraerTodos().valueChanges().subscribe( prod =>{
      //console.log(prod);
      this.listadoProductos = prod;
    });
  }

}
