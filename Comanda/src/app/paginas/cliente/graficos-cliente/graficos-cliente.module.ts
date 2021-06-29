import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficosClientePageRoutingModule } from './graficos-cliente-routing.module';

import { GraficosClientePage } from './graficos-cliente.page';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-labels';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficosClientePageRoutingModule,
    ChartsModule
  ],
  declarations: [GraficosClientePage]
})
export class GraficosClientePageModule {}
