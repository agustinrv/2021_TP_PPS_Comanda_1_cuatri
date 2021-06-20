import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirComidaPageRoutingModule } from './pedir-comida-routing.module';

import { PedirComidaPage } from './pedir-comida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirComidaPageRoutingModule
  ],
  declarations: [PedirComidaPage]
})
export class PedirComidaPageModule {}
