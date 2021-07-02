import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoAdivinarPageRoutingModule } from './juego-adivinar-routing.module';

import { JuegoAdivinarPage } from './juego-adivinar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoAdivinarPageRoutingModule
  ],
  declarations: [JuegoAdivinarPage]
})
export class JuegoAdivinarPageModule {}
