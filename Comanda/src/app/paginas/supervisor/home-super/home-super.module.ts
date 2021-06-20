import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSuperPageRoutingModule } from './home-super-routing.module';

import { HomeSuperPage } from './home-super.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSuperPageRoutingModule
  ],
  declarations: [HomeSuperPage]
})
export class HomeSuperPageModule {}
