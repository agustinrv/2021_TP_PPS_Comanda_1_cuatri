import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAnonimoPageRoutingModule } from './home-anonimo-routing.module';

import { HomeAnonimoPage } from './home-anonimo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAnonimoPageRoutingModule
  ],
  declarations: [HomeAnonimoPage]
})
export class HomeAnonimoPageModule {}
