import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuListaEsperaPageRoutingModule } from './menu-lista-espera-routing.module';

import { MenuListaEsperaPage } from './menu-lista-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuListaEsperaPageRoutingModule
  ],
  declarations: [MenuListaEsperaPage]
})
export class MenuListaEsperaPageModule {}
