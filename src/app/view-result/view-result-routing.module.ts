import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewResultPage } from './view-result.page';

const routes: Routes = [
  {
    path: '',
    component: ViewResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewResultPageRoutingModule {}
