import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/clases/Mesa/mesa';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { SolicitudMesaService } from 'src/app/servicios/solicitudMesa/solicitud-mesa.service';
import { SolicitudMesa } from 'src/app/clases/solicitudMesa/solicitud-mesa';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { EestadoSolicitudMesa } from 'src/app/enumerados/EestadoSolicitudMesa/eestado-solicitud-mesa';


@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {

  public listadoMesas: Mesa[] = [];
  public usuarioLogeado: any = {};
  public mesaAsignada: Mesa;


  //SCAN QR
  barcodeScannerOptions: BarcodeScannerOptions;
  numeroMesa: any;
  mesaEncontradaPorQR: any;


  ///Banderas normal: true, false, false
  BanderaMostrarBienvenido = true;
  BanderaMostrarEspera = false;
  BanderaMenuCliente = false;


  //Auxiliares
  auxSolicitudDeMesa: SolicitudMesa;
  SolicitudDeMesaEnBD: any = null;
  auxUsuarioIngresado: any;

  enumEstadosSolicitud = EestadoSolicitudMesa;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController,
    private scanner: BarcodeScanner,
    private mesaSvc: MesaService,
    private soliSvc: SolicitudMesaService,
    private userSvc: UsuarioService
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    }
    this.auxSolicitudDeMesa = new SolicitudMesa();
  }

  ngOnInit() {
    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));

    //Busco la informacion de usuario Ingresado
    this.userSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(user => {
      this.auxUsuarioIngresado = user[0];
    });

    //Traigo todas las mesas del restaurant
    this.mesaSvc.TraerTodos().valueChanges().subscribe((data => {
      this.listadoMesas = data;
    }));

    //Busco si el cliente ya realizo una solicitud
    this.soliSvc.TraerUno(this.usuarioLogeado.correo).valueChanges().subscribe(user => {
      this.SolicitudDeMesaEnBD = user[0];
      if(this.SolicitudDeMesaEnBD != null){
        this.BanderaMostrarBienvenido = false;
        this.BanderaMostrarEspera = true;
        this.BanderaMenuCliente = false;
      }
    });
  }

  //TERMINAR DE DESARROLLAR
  public BuscarMesaBD() {
    let tieneMesaAsignada = false;
    this.listadoMesas.filter((value, index, array) => {
      return value.asignada;
    }).forEach((element) => {
      ///Aqui va la validacion de que la mesa sea de ese cliente;
      if (element.cliente.correo == this.usuarioLogeado.correo && element.numero == this.numeroMesa) {
        tieneMesaAsignada = true;
        this.mesaAsignada = element;
      }
    });


    if (tieneMesaAsignada) {
      let usuarioConMesa: any = {};
      usuarioConMesa.correo = this.usuarioLogeado.correo;
      usuarioConMesa.mesa = this.numeroMesa;

      //Cambio vista de la IU
      this.BanderaMenuCliente = true;
      this.BanderaMostrarEspera = false;
      this.BanderaMostrarBienvenido = false;

      //this.router.navigateByUrl('home-cliente/pedir');
    }
    else {
      this.Toast('danger', 'Esta no fue la mesa asignada');
    }

  }


  ScanQRBienvenido() {
    this.scanner.scan().then(data => {
      if (data["text"] == 'inicio') {
        this.AgregarListaDeEspera();
      }
      else {
        this.Toast('danger', 'El QR escaneado no es valido!');
      }
    });
  }

  ScanQRMesa() {
    this.scanner.scan().then(data => {
      this.numeroMesa = data["text"];
      this.BuscarMesaBD();
    });
  }


  AgregarListaDeEspera() {
    this.auxSolicitudDeMesa.cliente = this.auxUsuarioIngresado;
    try {
      this.soliSvc.AgregarUno(this.auxSolicitudDeMesa);

      //Cambio vista de la IU
      this.BanderaMostrarBienvenido = false;
      this.BanderaMostrarEspera = true;
      this.Toast('success', 'Ya se encuentra en la lista de espera, espere a que lo atienda un Metre');

    } catch (error) {
      this.Toast('danger', error);
    }

  }

  async Toast(color: string, mensaje: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      color: color,
      position: 'bottom'

    });
    toast.present();
  }


  public CerrarSesion() {
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }
}
