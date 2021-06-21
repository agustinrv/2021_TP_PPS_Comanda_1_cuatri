import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {

  @Input() pedido : any;
  listadoProductos : any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.pedido);
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

}
