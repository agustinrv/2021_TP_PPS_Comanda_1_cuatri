import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoPptPageRoutingModule } from './juego-ppt-routing.module';

import { JuegoPptPage } from './juego-ppt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoPptPageRoutingModule
  ],
  declarations: [JuegoPptPage]
})
export class JuegoPptPageModule {}
