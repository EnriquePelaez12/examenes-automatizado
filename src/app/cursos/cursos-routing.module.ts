import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosPage } from './cursos.page';

const routes: Routes = [
  {
    path: '',
    component: CursosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosPageRoutingModule {}
