import { EtipoMesa } from './../../../enumerados/EtipoMesa/etipo-mesa';
import { element } from 'protractor';

import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clases/Cliente/cliente';
import { SolicitudMesa } from 'src/app/clases/solicitudMesa/solicitud-mesa';
import { EestadoSolicitudMesa } from 'src/app/enumerados/EestadoSolicitudMesa/eestado-solicitud-mesa';

import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { Mesa } from 'src/app/clases/Mesa/mesa';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-solicitudes-mesas',
  templateUrl: './solicitudes-mesas.page.html',
  styleUrls: ['./solicitudes-mesas.page.scss'],
})
export class SolicitudesMesasPage implements OnInit {

  public listadoClientes:Cliente[]=[];
  public listadoSolicitudes : SolicitudMesa[]=[];
  public listadoMesas:Mesa[]=[];

  public EestadoSolicitudMesa=EestadoSolicitudMesa;
  public EtipoMesa=EtipoMesa;
  public listaMostrar:any[]=[];

  public cantidaMesasDisponibles:number=0;
  public cantidaSolicitudes:number=0;

  constructor(
    private servicioSolicitudMesas: SolicitudMesaService,
    private servicioUsuarios:UsuarioService,
    private servicioMesas:MesaService,
    public toastController: ToastController){ }

  ngOnInit() {
    this.CargarSolicitudes();
    this.CargarMesas();
    
  }
  
  private CargarMesas()
  {
    this.servicioMesas.TraerTodos().valueChanges().subscribe((data:Mesa[])=>{
      this.listadoMesas=data;
      this.cantidaMesasDisponibles=0;
      
      this.listadoMesas.forEach((element) => {
        if(!element.asignada)
        {
          this.cantidaMesasDisponibles++;
        }
      });

    })
  }

  

  private CargarSolicitudes()
  {
    
    this.servicioSolicitudMesas.TraerSolicitudesPendientes().valueChanges().subscribe((solicitudes:SolicitudMesa[])=>{
      this.listadoSolicitudes = solicitudes;
      this.cantidaSolicitudes=this.listadoSolicitudes.length;
    });
  }

  public AsignarMesa(solicitudMesa:SolicitudMesa){
    
    let encontroSinAsignar=false;
    let mesaModificar:Mesa;
    console.log(mesaModificar);

    console.log(this.listadoMesas);

    for (let i=0;i<this.listadoMesas.length;i++)
    {
      if(!this.listadoMesas[i].asignada)
      {
        mesaModificar=this.listadoMesas[i];
        break;
      }
    }
      
    if(mesaModificar!=undefined)
    { 
      mesaModificar.asignada=true;
      mesaModificar.cliente=solicitudMesa.cliente;
      mesaModificar.cantidadDeComensales=solicitudMesa.cantidadDeComensales;
      mesaModificar.tipo=solicitudMesa.tipo;

      solicitudMesa.estadoSolicitud=EestadoSolicitudMesa.Aceptar;
      
      this.servicioMesas.ModificarUno(mesaModificar).then(()=>{
        this.Toast('success','Mesa Asignada');
        
      });
      this.servicioSolicitudMesas.ModificarUno(solicitudMesa);
    }
    else
    {
      this.Toast('danger','Error, no hay mesas disponibles');
    }

      
  }

  public RechazarCliente(solicitudMesa){
    console.log(solicitudMesa);
    //this.servicioSolicitudMesas.BorrarUno(user);
  }


  

  async Toast(color:string,mensaje:string,duration:number=2000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      color:color,
    });
    toast.present();
  }


}
