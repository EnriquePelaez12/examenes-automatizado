import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCursoPage } from './new-curso.page';

const routes: Routes = [
  {
    path: '',
    component: NewCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCursoPageRoutingModule {}
