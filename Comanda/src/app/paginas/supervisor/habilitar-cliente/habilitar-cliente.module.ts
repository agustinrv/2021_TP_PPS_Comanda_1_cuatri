import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabilitarClientePageRoutingModule } from './habilitar-cliente-routing.module';

import { HabilitarClientePage } from './habilitar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabilitarClientePageRoutingModule
  ],
  declarations: [HabilitarClientePage]
})
export class HabilitarClientePageModule {}
