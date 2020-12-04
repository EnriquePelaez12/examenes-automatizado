import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAsignaturaPage } from './new-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: NewAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAsignaturaPageRoutingModule {}
