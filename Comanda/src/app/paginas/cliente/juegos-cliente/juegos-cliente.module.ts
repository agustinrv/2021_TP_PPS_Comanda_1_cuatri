import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosClientePageRoutingModule } from './juegos-cliente-routing.module';

import { JuegosClientePage } from './juegos-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosClientePageRoutingModule
  ],
  declarations: [JuegosClientePage]
})
export class JuegosClientePageModule {}
