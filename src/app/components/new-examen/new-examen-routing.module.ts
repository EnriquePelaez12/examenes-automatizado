import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExamenPage } from './new-examen.page';

const routes: Routes = [
  {
    path: '',
    component: NewExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExamenPageRoutingModule {}
