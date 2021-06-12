import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesMesasPageRoutingModule } from './solicitudes-mesas-routing.module';

import { SolicitudesMesasPage } from './solicitudes-mesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesMesasPageRoutingModule
  ],
  declarations: [SolicitudesMesasPage]
})
export class SolicitudesMesasPageModule {}
