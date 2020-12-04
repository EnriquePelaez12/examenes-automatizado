import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTemaPage } from './new-tema.page';

const routes: Routes = [
  {
    path: '',
    component: NewTemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTemaPageRoutingModule {}
