import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, } from '@angular/forms';
import { AuthService } from '../../../servicios/auth/auth.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Cliente } from 'src/app/clases/Cliente/cliente';
import { Anonimo } from 'src/app/clases/Anonimo/anonimo';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  tipo : string = "ninguno";
  fotoCargada: any;
  socio : Cliente = new Cliente();
  anonimo : Anonimo = new Anonimo();
  perfilLogeado : number;

  public formAnonimo: FormGroup = this.formBuilder.group({
		nombre: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,25}$'),this.noWhitespaceValidator]],
		 foto: [null, [Validators.required]]
		});


	public form: FormGroup = this.formBuilder.group({
		nombre: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,25}$'),this.noWhitespaceValidator]],
		apellido: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,25}$'),this.noWhitespaceValidator]],
		dni: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
		correo: [null, [Validators.required, Validators.email]],
		contrasenia: [null, [Validators.required, Validators.pattern('^[a-zA-ZñÑ0-9_-]{6,18}$')]],
		foto: [null, [Validators.required]]
		});

	 public barcodeOptions: BarcodeScannerOptions = {
	 	prompt: "Colocar el codigo de barras en la linea de escaneo",
	 	formats: "QR_CODE,PDF_417",
	 	orientation: "landscape"
	 };

	 noWhitespaceValidator(control: FormControl) {
		const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
		const isValid = !isWhitespace;
		return isValid ? null : { 'whitespace': true };
	  }

	public validation_messages = {
		'nombre': [
			{ type: 'required', message: 'El nombre es requerido.' },
			{ type: 'pattern', message: 'Introduzca un nombre de mínimo 3 a 20 caracteres y no números.' }
		],
		'apellido': [
			{ type: 'required', message: 'El apellido es requerido.' },
			{ type: 'pattern', message: 'Introduzca un apellido de mínimo 3 a 20 caracteres y no números.' }
		],
		'dni': [
			{ type: 'required', message: 'El DNI es requerido.' },
			{ type: 'pattern', message: 'Introduzca un DNI válido(8 caracteres).' }
		],
		'correo': [
			{ type: 'required', message: 'El correo es requerido.' },
			{ type: 'email', message: 'Introduzca un correo válido.' }
		],
		'contrasenia': [
			{ type: 'required', message: 'La contraseña es requerida.' },
			{ type: 'pattern', message: 'La contraseña debe tener entre 6 y 18 caracteres.' }
		],
		    'foto': [
		    	{ type: 'required', message: 'La foto es requerida.' },
		    ]
	};


  constructor(private formBuilder: FormBuilder, private auth: AuthService,private toastController: ToastController, private qr: BarcodeScanner, private camera: Camera,private storage: AngularFireStorage ,private usuarioSvc : UsuarioService, private router: Router) { }

  ngOnInit() {
	if(localStorage.getItem("usuarioLogeado") != null)
	{
		let usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
		this.perfilLogeado = usuario.perfil;
	}
	
	
  }


  tomarFotografia() {
	const options: CameraOptions = {
		quality: 100,
		targetHeight: 600,
		targetWidth: 600,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		correctOrientation: true
	}
	this.camera.getPicture(options).then((imageData) => {
		var base64Str = 'data:image/jpeg;base64,' + imageData;
		if(this.tipo=='socio')
		{
			this.form.controls.foto.setValue(base64Str);
			
			
		}
		if(this.tipo=='anonimo')
		{
			this.formAnonimo.controls.foto.setValue(base64Str);
			
			
		}
		
	});
}

escanearDni() {
	let auxDni;
	let scanSub = this.qr.scan(this.barcodeOptions).then(dataString => {
		let x: any = [];
		x = dataString.text.split('@');
		if (x.length == 8 || x.length == 9) {
			this.form.controls.apellido.setValue(x[1]);
			this.form.controls.nombre.setValue(x[2]);
			this.form.controls.dni.setValue(x[4]);
		} else {
			this.form.controls.dni.setValue(x[1]);
			this.form.controls.apellido.setValue(x[4]);
			this.form.controls.nombre.setValue(x[5]);
		}
	});
}


registrar() {

	if(this.tipo=='socio')
	{		
		
		let contrasenia : string = this.form.get('contrasenia').value;

		this.socio.nombre = this.form.get('nombre').value;
		this.socio.apellido = this.form.get('apellido').value;
		this.socio.dni = this.form.get('dni').value;
		this.socio.correo = this.form.get('correo').value;
		this.socio.foto = this.form.get('foto').value;
		this.socio.habilitado = false;

		

		this.auth.Register(this.socio.correo, contrasenia).then(response=>{

			this.socio.id = response.user.uid;
            let email = response.user.email;
			
			 if(this.socio.foto != null)
             {
               const filePath = `/cliente/${email}/fotoCliente.jpg`;
        

				this.subirImagen(filePath, this.socio.foto).then(url => {
					this.fotoCargada = url;
					this.socio.foto = this.fotoCargada;
					this.usuarioSvc.AgregarUsuario(JSON.parse(JSON.stringify(this.socio)));
				});
               
               	   this.form.reset();

			 	   this.Toast('success','Se ha registrado correctamente!')
                 
			 	   if(this.perfilLogeado==5)
			 	   {
			 		  this.router.navigateByUrl('home-metre');
			 	   }
			 	   else
			 	   {
			 		   this.router.navigateByUrl('login');
			 	   }
          
             }
		})
	}
	else
	{
		if(this.tipo=='anonimo')
		{
			
			this.anonimo.nombre = this.formAnonimo.get('nombre').value;
			this.anonimo.foto = this.formAnonimo.get('foto').value;
			this.anonimo.habilitado = true;
			
			this.auth.signAnonimo().then((response : any)=>{
				
			this.anonimo.id = response.user.uid;
			
			 if(this.anonimo.foto != null)
             {
               const filePath = `/anonimo/${this.anonimo.id}/fotoAnonimo.png`; //cambiar por email
               
			   this.subirImagen(filePath, this.socio.foto).then(url => {
				this.fotoCargada = url;
				this.anonimo.foto = this.fotoCargada;
				this.usuarioSvc.AgregarUsuario(JSON.parse(JSON.stringify(this.anonimo)));
				localStorage.setItem('anonimo',JSON.stringify(this.anonimo.nombre));
			});
  
                
                    
			  	    
				
                    this.formAnonimo.reset();

			 	   if(this.perfilLogeado==5)
			 	   {
			 		  this.router.navigateByUrl('home-metre');
			 	   }
			 	   else
			 	   {
			 		   this.router.navigateByUrl('home-cliente');
			 	   }
				   
                 

             }

			


			})
		
		}
	}
	
}

public subirImagen(ruta: string, data: any) {
    return this.storage.ref(ruta).putString(data, 'data_url').then(data => {
      return data.ref.getDownloadURL().then(x => x);
    });
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

setTipoNinguno()
{
	this.tipo='ninguno';
	this.form.reset();
	this.formAnonimo.reset();
}



}
