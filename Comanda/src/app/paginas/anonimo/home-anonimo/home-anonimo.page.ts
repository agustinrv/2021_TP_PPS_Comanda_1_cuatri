import { ToastController } from '@ionic/angular';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/clases/Mesa/mesa';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { SolicitudMesa } from 'src/app/clases/solicitudMesa/solicitud-mesa';
import { EestadoSolicitudMesa } from 'src/app/enumerados/EestadoSolicitudMesa/eestado-solicitud-mesa';

@Component({
  selector: 'app-home-anonimo',
  templateUrl: './home-anonimo.page.html',
  styleUrls: ['./home-anonimo.page.scss'],
})
export class HomeAnonimoPage implements OnInit {

  listadoUsuarios : any;
  public listadoMesas:Mesa[]=[];
  public usuarioLogeado:any={};

  public tieneUnaSolicitud:any=false;
  public mesaAsignada:Mesa;

  constructor(
    private auth: AuthService,
    private router: Router,
    private servicioMesa:MesaService,
    private toastController:ToastController,
    private servicioSolicitudes:SolicitudMesaService) { }

  ngOnInit() {
    this.usuarioLogeado=JSON.parse(localStorage.getItem('usuarioLogeado'));
    this.CargarMesas();
    this.CargarSolicitudMesa();

  }

  public CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }
  private CargarMesas()
  {
    this.servicioMesa.TraerTodos().valueChanges().subscribe((data=>{
        this.listadoMesas=data;
    }))
  }

  private CargarSolicitudMesa()
  {
    this.servicioSolicitudes.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe((data:SolicitudMesa[])=>{

      if(data.length==0)
      {
        this.tieneUnaSolicitud=false;
      }
      else
      {
          this.tieneUnaSolicitud=true;
      }
      
        
    })
  }

  public SolicitarMesa()
  {
    if(!this.tieneUnaSolicitud)
    {
      this.router.navigateByUrl('solicitar-mesa');
    }
    else
    {
      this.Toast('danger','Ya tiene una solicitud de mesa,no puede realizar otra');
      /* AVISO LO ACONTESIDO DE FORMA PARTICULAR
      switch(this.tieneUnaSolicitud)   
      {
        case EestadoSolicitudMesa.Aceptar:
          break;  
            case EestadoSolicitudMesa.Cancelar:
          break;  
           case EestadoSolicitudMesa.Finalizado:
          break;  
            case EestadoSolicitudMesa.Pendiente:
          break;  
            case EestadoSolicitudMesa.Rechazar:
          break;  
      }
      */
    }
  }

  ///Aqui va la validacion de que la mesa sea de ese cliente;
  public IngresarAMesa()
  {
    let tieneMesaAsignada=false;
      this.listadoMesas.filter((value,index,array)=>{
        return value.asignada;
      }).forEach((element)=>{
        ///Aqui va la validacion de que la mesa sea de ese cliente;
        if(element.cliente.correo==this.usuarioLogeado.correo)
        {
          tieneMesaAsignada=true;
          this.mesaAsignada=element;
        }
      });


      if(tieneMesaAsignada)
      {
        this.router.navigateByUrl('mesa-clientes');
        //Deberia ingresar a la camara escanear y usar la funcion
        //VerificarQueSeaMiMesa() que no esta desarrollada,solo declarada
      }
      else{
        this.Toast('danger','Usted no tiene mesa asignada');
      }
    
  }
//
  public VerificarQueSeaMiMesa(numeroMesa)
  {
      if(numeroMesa!=this.mesaAsignada.numero)
      {
        //error
      }
      else{
        //Ingresar
      }
  }

  async Toast(color:string,mensaje:string,duration:number=2000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      color:color,
      position:'bottom'

    });
    toast.present();
  }


  

}
