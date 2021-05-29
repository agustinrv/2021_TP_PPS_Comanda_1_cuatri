import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Usuario } from '../clases/Usuario/usuario';
import { AuthService } from '../servicios/auth/auth.service';
import { UsuarioService } from '../servicios/usuario/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public unUsuario: Usuario;
  public userValid: boolean = true;
  notfound: number = 0;
  userForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServicie:AuthService,
    private servicioUsuario:UsuarioService,

  ) {
    this.unUsuario=new Usuario();
  }
  ngOnInit(): void {
    this.initForm();
  }
  onLogin() {
    this.unUsuario.correo=this.userForm.value.email;
    this.unUsuario.clave=this.userForm.value.password;


    console.log(this.unUsuario);

    this.authServicie.Login(this.unUsuario.correo,this.unUsuario.clave).then(()=>{
        this.servicioUsuario.TraerUno(this.unUsuario.correo).valueChanges().subscribe((data)=>{
          let datosUsuario:any=data;
        
          let usuarioLogin:any={};
          usuarioLogin.correo= this.unUsuario.correo;
          usuarioLogin.perfil= datosUsuario[0].perfil;
          
          
          localStorage.setItem('usuarioLogeado',JSON.stringify(usuarioLogin));

          this.router.navigateByUrl('/home');
        });
    }).catch(()=>{
      alert('usuario y/o contraseña incorrecta');
    });
  
   }

   public Login(_correo,_password)
   {
    this.userForm.setValue({email: _correo ,password: _password});
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
}
