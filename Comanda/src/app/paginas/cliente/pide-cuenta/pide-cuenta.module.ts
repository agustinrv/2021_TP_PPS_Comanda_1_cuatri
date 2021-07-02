import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PideCuentaPageRoutingModule } from './pide-cuenta-routing.module';

import { PideCuentaPage } from './pide-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PideCuentaPageRoutingModule
  ],
  declarations: [PideCuentaPage]
})
export class PideCuentaPageModule {}
