import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';

@Component({
  selector: 'app-juego-adivinar',
  templateUrl: './juego-adivinar.page.html',
  styleUrls: ['./juego-adivinar.page.scss'],
})
export class JuegoAdivinarPage implements OnInit {

  numero : number=0;
  elegido : number = 0;
  estado : boolean;
  usuarioLogeado : string;
  pedido : Pedido;
  intentos = 1;

  constructor(private pedidoSvc: PedidosService) { }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.usuarioLogeado = user.correo;
    
    this.pedidoSvc.TraerPedidosDeUnCliente(this.usuarioLogeado).valueChanges().pipe(take(1)).subscribe(pedidos=>{
      pedidos.forEach((element:any)=>{
        console.log(element.cliente.correo);

        if(element.cliente.correo == this.usuarioLogeado) //chequear x dia o instancia
        {
            this.pedido = element;
            //chequear si ya intento 1 vez
        }
      })
    })

  }

  random(min, max, num) {
     this.numero = Math.floor((Math.random() * (max - min + 1)) + min);
     this.elegido = num;

     if(this.numero == num)
     {
       this.estado = true;
       this.pedido.precioTotal = this.pedido.precioTotal - (this.pedido.precioTotal * 0.10); //descuento 10%
       console.log(this.pedido)
      //  this.pedidoSvc.ModificarUno(this.pedido);
     }
     else
     {
       this.estado = false;
     }

  }



  reiniciar()
  {
    this.numero = 0;
    this.estado = null;
    this.elegido = 0;
  }

}
