
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
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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

  public inicio=false;

  //subscribe

  public subscribeMesas;
  public subscribeSolicitudes;


  constructor(
    private servicioSolicitudMesas: SolicitudMesaService,
    private servicioUsuarios:UsuarioService,
    private servicioMesas:MesaService,
    public toastController: ToastController,
    public actionSheetController:ActionSheetController,
    public localNotifications:LocalNotifications){ }

  ngOnInit() {
    this.CargarSolicitudes();
    this.CargarMesas();
    
  }

  ngOnDestroy() {
    this.subscribeMesas.unsubscribe();
    this.subscribeSolicitudes.unsubscribe();
  }

  public Volver(){
    localStorage.removeItem('usuarioLogeado');
    this.ngOnDestroy();
  }
  
  private CargarMesas()
  {
    this.subscribeMesas=this.servicioMesas.TraerOrdenado().valueChanges().subscribe((data:Mesa[])=>{
      this.listadoMesas=data;

      console.log('estoy en subscribe mesas');
      this.cantidaMesasDisponibles=0;

      this.listaMesasDisponibles=this.listadoMesas.filter((value,index,array)=>{
        return !value.asignada;
      });

    

    });
  }

  

  private CargarSolicitudes()
  {
    
    this.subscribeSolicitudes=this.servicioSolicitudMesas.TraerSolicitudesPendientes().valueChanges().subscribe((solicitudes:SolicitudMesa[])=>{
      this.listadoSolicitudes = solicitudes;
      console.log('estoy en subscribe solicitudes')
      this.cantidaSolicitudes=this.listadoSolicitudes.length;

      if(this.inicio)
      {
        this.LanzarNotificacion(this.listadoSolicitudes.length);
      }
      this.inicio=true;
    });
  }

  LanzarNotificacion(numeroId:number){
    this.localNotifications.schedule([{
      id: numeroId,
      title:'El Mazacote',
      text: 'Nuevo cliente en lista',
      sound:'assets/mp3/notificacion.mp3',
      icon: 'assets/splash/center.png'
     }]);
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
      this.inicio=false;
    }
    else
    {
      this.Toast('danger','Error, no hay mesas disponibles');
    }

      
  }

  public RechazarCliente(solicitudMesa){
    this.servicioSolicitudMesas.BorrarUno(solicitudMesa);
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

  public async AbrirMenuReiniciarMesas()
  {
     let menu = this.GenerarMenuReiniciarMesas();
     const actionSheet = await this.actionSheetController.create(menu);
     await actionSheet.present();
 
     const { role } = await actionSheet.onDidDismiss();
  }

  
  public ReiniciarMesa(unaMesa:Mesa)
  {
    unaMesa.asignada=false;
    this.servicioMesas.ModificarUno(unaMesa);
  }

  public GenerarMenuReiniciarMesas()
  {
    let menu:any={};

    menu.header='Que mesa quiere limpiar?';
    menu.cssClass='menuMesas';
    
    let listaBotones:any[]=[];

    
    this.listadoMesas.forEach(element => {
      
        let unBoton:any={};
        unBoton.text='Mesa '+ element.numero;
        unBoton.handler=()=>{
          this.ReiniciarMesa(element);        
        }
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

