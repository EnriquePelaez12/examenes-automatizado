import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosExamenPage } from './datos-examen.page';

const routes: Routes = [
  {
    path: '',
    component: DatosExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosExamenPageRoutingModule {}
