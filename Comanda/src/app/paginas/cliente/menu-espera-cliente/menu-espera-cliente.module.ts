import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuEsperaClientePageRoutingModule } from './menu-espera-cliente-routing.module';

import { MenuEsperaClientePage } from './menu-espera-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuEsperaClientePageRoutingModule,
 

  ],
  declarations: [MenuEsperaClientePage]
})
export class MenuEsperaClientePageModule {}
