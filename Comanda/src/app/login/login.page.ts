import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Usuario } from '../clases/Usuario/usuario';
import { AuthService } from '../servicios/auth/auth.service';
import { UsuarioService } from '../servicios/usuario/usuario.service';
import { Eperfil } from '../enumerados/Eperfil/eperfil';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public unUsuario: any = {};
  public userValid: boolean = true;
  notfound: number = 0;
  userForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServicie: AuthService,
    private servicioUsuario: UsuarioService,
    private loadingController: LoadingController,
    private alertController: AlertController

  ) {
    //this.unUsuario = new Usuario();
  }
  ngOnInit(): void {
    this.initForm();
    
  }
  async onLogin() {
    this.unUsuario = new Usuario();
    this.unUsuario.correo = this.userForm.value.email;
    this.unUsuario.clave = this.userForm.value.password;
    console.log('estoy en login');

    let loading = this.presentLoading()

    this.authServicie.Login(this.unUsuario.correo, this.unUsuario.clave).then(() => {

      this.servicioUsuario.TraerUno(this.unUsuario.correo).valueChanges().subscribe((data) => {
        let datosUsuario: any = data;

        let usuarioLogin: any = {};
        usuarioLogin.correo = this.unUsuario.correo;
        usuarioLogin.perfil = datosUsuario[0].perfil;
        usuarioLogin.nombre = datosUsuario[0].nombre;
        usuarioLogin.habilitado = datosUsuario[0].habilitado;
        

        localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioLogin));
        console.log(usuarioLogin);

        switch (usuarioLogin.perfil) {
          case Eperfil.Dueño:
            this.router.navigateByUrl('/home-super');
            console.log(usuarioLogin.perfil);
            break;
          case Eperfil.Supervisor:
            this.router.navigateByUrl('/home-super');
            console.log(usuarioLogin.perfil);
            break;
          case Eperfil.Anonimo:
            this.router.navigateByUrl('/home-anonimo');
            console.log(usuarioLogin.perfil);
            break;
          case Eperfil.Metre:
            this.router.navigateByUrl('/home-metre');
            console.log(usuarioLogin.perfil);
            break;
          case Eperfil.Cliente:
            if(usuarioLogin.habilitado)
            {
              this.router.navigateByUrl('/home-cliente');
            }
            else
            {
              this.presentAlert('Aun no fue habilitado por un supervisor');
            }
            
            console.log(usuarioLogin.perfil);
            break;
          case Eperfil.Cocinero:
            this.router.navigateByUrl('/home-cocinero');
            console.log(usuarioLogin.perfil);
            break;
          case Eperfil.BarTender:
            this.router.navigateByUrl('/home-bartender');
            break;
          case Eperfil.Mozo:
            this.router.navigateByUrl('home-mesero');
            console.log(usuarioLogin.perfil);
            break;
          ///Agregar los otros homes
          

        }
        //this.router.navigateByUrl('/home');
      });
    }).catch(async () => {
      (await loading).onDidDismiss().then(() => {
        this.presentAlert('Usuario y/o contraseña incorrecta');///
      })
    });

  }

  public Login(_correo, _password) {
    this.userForm.setValue({ email: _correo, password: _password });
  }

  irRegistro() {
    this.router.navigateByUrl("alta-cliente");
  }



  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Espere un momento',
      duration: 2000
    });
    await loading.present();

    return loading;
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();


  }

}
