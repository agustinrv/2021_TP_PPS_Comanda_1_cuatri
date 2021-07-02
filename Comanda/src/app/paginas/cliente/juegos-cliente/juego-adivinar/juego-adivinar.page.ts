import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Mesa } from 'src/app/clases/Mesa/mesa';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';


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
  mesa : Mesa;
  intento : boolean;

  constructor(private mesaSvc: MesaService) { }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.usuarioLogeado = user.correo;
    
    this.mesaSvc.TraerTodos().valueChanges().pipe(take(1)).subscribe(mesa=>{
      mesa.forEach((element:any)=>{
        

        if(element.cliente.correo == this.usuarioLogeado) 
        {
            this.mesa = element;
            this.intento = this.mesa.juego1;
            
            console.log(element.cliente.correo);
            
        }
      })
    })

  }

  random(min, max, num) {
     this.numero = Math.floor((Math.random() * (max - min + 1)) + min);
     this.elegido = num;
     

     console.log(this.mesa.juego1);

     if(this.numero == num)
     {
       this.estado = true;

       if(!this.mesa.juego1)
       {
        
        this.mesa.juego1 = true;
        this.mesa.gano1 = true;
        this.mesaSvc.ModificarUno(this.mesa);
        console.log("Gano!");
       }
       
     }
     else
     {
       
       this.estado = false;
  
       if(!this.mesa.juego1)
       {
        this.mesa.juego1 = true;
        this.mesaSvc.ModificarUno(this.mesa);
       }
       
       console.log(this.mesa);

     }

     
  }



  reiniciar()
  {
    this.numero = 0;
    this.estado = null;
    this.elegido = 0;
    this.intento = true;
  }

}
