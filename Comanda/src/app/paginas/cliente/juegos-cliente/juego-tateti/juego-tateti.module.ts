import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoTatetiPageRoutingModule } from './juego-tateti-routing.module';

import { JuegoTatetiPage } from './juego-tateti.page';
import { CeldaComponent } from './celda/celda.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoTatetiPageRoutingModule,
  ],
  declarations: [
    JuegoTatetiPage,
    CeldaComponent
    
  ]
})
export class JuegoTatetiPageModule {}
