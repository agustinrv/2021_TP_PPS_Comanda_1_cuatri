import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSuperPage } from './home-super.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSuperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSuperPageRoutingModule {}
