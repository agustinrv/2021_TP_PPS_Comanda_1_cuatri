import { Component, OnInit } from '@angular/core';
import { Mesa } from 'src/app/clases/Mesa/mesa';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';

@Component({
  selector: 'app-solicitar-mesa',
  templateUrl: './solicitar-mesa.page.html',
  styleUrls: ['./solicitar-mesa.page.scss'],
})
export class SolicitarMesaPage implements OnInit {

  public nuevaMesa:Mesa;

  public colorBoton1:string='primary';
  public colorBoton2:string='primary';
  public colorBoton3:string='primary';
  public colorBoton4:string='primary';
  
  

  constructor(private servicioMesa:MesaService) { 
      this.nuevaMesa=new Mesa();
  }

  ngOnInit() {
  }

  public SeleccionarCantidad(cantidad:number){

    this.nuevaMesa.cantidadDeComensales=cantidad;

      switch(cantidad)
      {
        case 1:
            this.colorBoton1='success';
            this.colorBoton2='primary';
            this.colorBoton3='primary';
            this.colorBoton4='primary';
          break;
        case 2:
            this.colorBoton1='primary';
            this.colorBoton2='success';
            this.colorBoton3='primary';
            this.colorBoton4='primary';
          break;
        case 3:
            this.colorBoton1='primary';
            this.colorBoton2='primary';
            this.colorBoton3='success';
            this.colorBoton4='primary';
          break;
          case 4:
          this.colorBoton1='primary';
          this.colorBoton2='primary';
          this.colorBoton3='primary';
          this.colorBoton4='success';
          break;
      }

  }

  



  public SolicitarMesa(cantidad:number)
  {
      this.nuevaMesa.cantidadDeComensales=cantidad;
      
      //this.servicioMesa.AgregarUno()
  }

}
