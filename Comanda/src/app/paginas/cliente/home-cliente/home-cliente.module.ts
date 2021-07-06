import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientePageRoutingModule } from './home-cliente-routing.module';

import { HomeClientePage } from './home-cliente.page';
import { ModalGraficosEsperaComponent } from '../modal-graficos-espera/modal-graficos-espera.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClientePageRoutingModule,
    ChartsModule
  ],
  declarations: [HomeClientePage,ModalGraficosEsperaComponent]
})
export class HomeClientePageModule {}
