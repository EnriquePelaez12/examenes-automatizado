import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeExamenPage } from './home-examen.page';

const routes: Routes = [
  {
    path: '',
    component: HomeExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeExamenPageRoutingModule {}
