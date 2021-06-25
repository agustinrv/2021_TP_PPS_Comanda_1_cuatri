import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido/pedido';
import { EestadoPedido } from 'src/app/enumerados/EestadoPedido/eestado-pedido';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { MesaService } from 'src/app/servicios/mesa/mesa.service';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ChatMeseroPage } from '../chat-mesero/chat-mesero.page';
import { ModalDetallesPedidosComponent } from '../modal-detalles-pedidos/modal-detalles-pedidos.component';

@Component({
  selector: 'app-home-mesero',
  templateUrl: './home-mesero.page.html',
  styleUrls: ['./home-mesero.page.scss'],
})
export class HomeMeseroPage implements OnInit {
  info = "Mostrar";

  //Mesas
  listadoMesasOrdenada : any;




  constructor(
    private actionSheetController : ActionSheetController,
    private mesaSvc : MesaService,
    private modalCtrl: ModalController,
    private auth : AuthService,
    private router : Router,
  
  ) { }

  ngOnInit() {
    this.mesaSvc.TraerOrdenado().valueChanges().subscribe(mesa => {
      this.listadoMesasOrdenada = mesa;
    });

    
  }

  CerrarSesion(){
    localStorage.removeItem('usuarioLogeado');
    this.auth.LogOutCurrentUser();
    this.router.navigateByUrl('/login');
  }

 

  async ElegirMesa() {
    
    let mesas = this.GenerarMesas();

    const actionSheet = await this.actionSheetController.create(mesas);
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  public GenerarMesas()
  {
    let menu:any={};

    menu.header='Mesas';
    menu.cssClass='menuMesas';
    
    let listaBotones:any[]=[];
    
    this.listadoMesasOrdenada.forEach(element => {
      
        let unBoton:any={};
        unBoton.text='Mesa '+ element.numero;
        unBoton.handler=()=>{
          this.modalChat(element.numero);
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
      listaBotones.push(botonCancelar);
      menu.buttons=listaBotones;
      return menu;
  }

  async modalChat(numMesa:any) {
    const modal = await this.modalCtrl.create({
      component: ChatMeseroPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'numMesa': numMesa
      }
    });
    modal.onDidDismiss().then((data) => {
      const info = data['data'];
      console.log(info);
    })

    return await modal.present();
  }

  
}
