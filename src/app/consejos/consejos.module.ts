import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsejosPage } from './consejos.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ConsejosPageRoutingModule } from './consejos-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ConsejosPage }]),
    ConsejosPageRoutingModule,
  ],
  declarations: [ConsejosPage]
})
export class ConsejosPageModule {}
