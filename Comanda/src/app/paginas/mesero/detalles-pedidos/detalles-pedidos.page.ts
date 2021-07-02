import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-pedidos',
  templateUrl: './detalles-pedidos.page.html',
  styleUrls: ['./detalles-pedidos.page.scss'],
})
export class DetallesPedidosPage implements OnInit {

  @Input() mesaInfo : any;

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }


  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      componentProps: {
      }
    })
  }
}
