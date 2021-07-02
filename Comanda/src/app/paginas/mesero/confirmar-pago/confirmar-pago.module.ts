import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarPagoPageRoutingModule } from './confirmar-pago-routing.module';

import { ConfirmarPagoPage } from './confirmar-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarPagoPageRoutingModule
  ],
  declarations: [ConfirmarPagoPage]
})
export class ConfirmarPagoPageModule {}
