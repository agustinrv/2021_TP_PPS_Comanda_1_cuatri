
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
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-solicitudes-mesas',
  templateUrl: './solicitudes-mesas.page.html',
  styleUrls: ['./solicitudes-mesas.page.scss'],
})
export class SolicitudesMesasPage implements OnInit {

  public listadoClientes:Cliente[]=[];
  public listadoSolicitudes : SolicitudMesa[]=[];

  public listadoMesas:Mesa[]=[];
  public listaMesasDisponibles:Mesa[]=[];



  public EestadoSolicitudMesa=EestadoSolicitudMesa;
  public EtipoMesa=EtipoMesa;
  public listaMostrar:any[]=[];

  public cantidaMesasDisponibles:number=0;
  public cantidaSolicitudes:number=0;

  public mesaSeleccionada:Mesa;

  constructor(
    private servicioSolicitudMesas: SolicitudMesaService,
    private servicioUsuarios:UsuarioService,
    private servicioMesas:MesaService,
    public toastController: ToastController,
    public actionSheetController:ActionSheetController){ }

  ngOnInit() {
    this.CargarSolicitudes();
    this.CargarMesas();
    
  }
  
  private CargarMesas()
  {
    this.servicioMesas.TraerOrdenado().valueChanges().subscribe((data:Mesa[])=>{
      this.listadoMesas=data;
      this.cantidaMesasDisponibles=0;

      this.listaMesasDisponibles=this.listadoMesas.filter((value,index,array)=>{
        return !value.asignada;
      });

    

    });
  }

  

  private CargarSolicitudes()
  {
    
    this.servicioSolicitudMesas.TraerSolicitudesPendientes().valueChanges().subscribe((solicitudes:SolicitudMesa[])=>{
      this.listadoSolicitudes = solicitudes;
      this.cantidaSolicitudes=this.listadoSolicitudes.length;
    });
  }

  public AsignarMesa(solicitudMesa:SolicitudMesa,mesaSeleccionada:Mesa){
    
    let mesaModificar:Mesa;  
    mesaModificar=mesaSeleccionada;
      
    if(mesaModificar!=undefined)
    { 
      mesaModificar.asignada=true;
      mesaModificar.cliente=solicitudMesa.cliente;
      //mesaModificar.cantidadDeComensales=solicitudMesa.cantidadDeComensales;
      //mesaModificar.tipo=solicitudMesa.tipo;

      solicitudMesa.estadoSolicitud=EestadoSolicitudMesa.Aceptar;
      solicitudMesa.numMesa=mesaSeleccionada.numero;
      
      this.servicioMesas.ModificarUno(mesaModificar).then(()=>{
        this.Toast('success','Mesa ' + mesaModificar.numero + ' asignada');
        
      });
      this.servicioSolicitudMesas.ModificarUno(solicitudMesa);
    }
    else
    {
      this.Toast('danger','Error, no hay mesas disponibles');
    }

      
  }

  public RechazarCliente(solicitudMesa){
    this.servicioSolicitudMesas.BorrarUno(solicitudMesa);
  }

  public ReiniciarMesas()
  {
    this.listadoMesas.forEach((element)=>{
    
      element.asignada=false;

      this.servicioMesas.ModificarUno(element);
    });

  }

  public ReiniciarSolicitudes()
  {
      this.servicioSolicitudMesas.BorrarTodos();
  }

  async SeleccionarMesa(unaSolicitud:SolicitudMesa) {
    
    let menu = this.GenerarMenu(unaSolicitud);

    const actionSheet = await this.actionSheetController.create(menu);
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  public GenerarMenu(unaSolicitud:SolicitudMesa)
  {
    let menu:any={};

    menu.header='Mesas Disponibles';
    menu.cssClass='menuMesas';
    
    let listaBotones:any[]=[];


    
    this.listaMesasDisponibles.forEach(element => {
      
        let unBoton:any={};
        unBoton.text='Mesa '+ element.numero;
        unBoton.handler=()=>{
          this.AsignarMesa(unaSolicitud,element);
        };
        
        listaBotones.push(unBoton);
      });
      
      let botonCancelar:any={};
      
      botonCancelar.text='Cancelar';
      botonCancelar.role='cancel';
      botonCancelar.icon='close';
      botonCancelar.handler=()=>{
        console.log('Cancel clicked');
      }
      
      listaBotones.push(botonCancelar)
  
      menu.buttons=listaBotones;


      return menu;
  
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

