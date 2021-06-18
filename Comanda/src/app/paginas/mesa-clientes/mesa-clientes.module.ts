import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesaClientesPageRoutingModule } from './mesa-clientes-routing.module';

import { MesaClientesPage } from './mesa-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesaClientesPageRoutingModule
  ],
  declarations: [MesaClientesPage]
})
export class MesaClientesPageModule {}
