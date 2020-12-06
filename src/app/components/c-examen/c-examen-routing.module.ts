import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CExamenPage } from './c-examen.page';

const routes: Routes = [
  {
    path: '',
    component: CExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CExamenPageRoutingModule {}
