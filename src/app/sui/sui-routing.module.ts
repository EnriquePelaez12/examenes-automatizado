import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiPage } from './sui.page';

const routes: Routes = [
  {
    path: '',
    component: SuiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiPageRoutingModule {}
