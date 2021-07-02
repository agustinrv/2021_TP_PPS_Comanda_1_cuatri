import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PideCuentaPage } from '../pide-cuenta/pide-cuenta.page';

@Component({
  selector: 'app-menu-espera-cliente',
  templateUrl: './menu-espera-cliente.page.html',
  styleUrls: ['./menu-espera-cliente.page.scss'],
})
export class MenuEsperaClientePage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  async ModalPedirCuenta() {
    const modal = await this.modalController.create({
      component: PideCuentaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
