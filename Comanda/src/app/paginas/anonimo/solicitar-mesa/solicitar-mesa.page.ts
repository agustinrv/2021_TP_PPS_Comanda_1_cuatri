import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anonimo } from 'src/app/clases/Anonimo/anonimo';
import { SolicitudMesa } from 'src/app/clases/solicitudMesa/solicitud-mesa';
import { EestadoSolicitudMesa } from 'src/app/enumerados/EestadoSolicitudMesa/eestado-solicitud-mesa';
import { EtipoMesa } from 'src/app/enumerados/EtipoMesa/etipo-mesa';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-solicitar-mesa',
  templateUrl: './solicitar-mesa.page.html',
  styleUrls: ['./solicitar-mesa.page.scss'],
})
export class SolicitarMesaPage implements OnInit {

  public nuevaSolicitud:SolicitudMesa;

  public colorBoton1:string='primary';
  public colorBoton2:string='primary';
  public colorBoton3:string='primary';
  public colorBoton4:string='primary';
  
  public EtipoMesa=EtipoMesa;//no borrar sirve en html
  public eligioCantidad=false;
  

  constructor(private servicioSolicitudMesa:SolicitudMesaService,
              private router:Router,
              private servicioUsuario:UsuarioService) { 

              this.nuevaSolicitud=new SolicitudMesa();
              this.nuevaSolicitud.tipo=EtipoMesa.Normal;
      
  }

  ngOnInit() {
    this.CargarDatosCliente();

  }

  public CargarDatosCliente(){
    let usuarioLogeado=JSON.parse(localStorage.getItem('usuarioLogeado'));
     this.servicioUsuario.TraerUno(usuarioLogeado.correo).valueChanges().subscribe((data:Anonimo[])=>{
          this.nuevaSolicitud.cliente=data[0];
     });
  }

  public SeleccionarCantidad(cantidad:number){

    this.nuevaSolicitud.cantidadDeComensales=cantidad;    

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
      this.eligioCantidad=true;

  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })

  }

  public SolicitarMesa()
  {
    this.nuevaSolicitud.estadoSolicitud=EestadoSolicitudMesa.Pendiente;
    this.servicioSolicitudMesa.AgregarUno(this.nuevaSolicitud).then(()=>{
      //console.log('agregado');
      this.alert('success','Solicitud Realizada,enseguida la revisaremos');//puede revisar su solicitud en...
      setTimeout(()=>{
        this.router.navigateByUrl('home-anonimo');
      },3500);
      
    }).catch(()=>{
      this.alert('error','Error,no se a podido completar su solicitud');
    }); 
  }

}
