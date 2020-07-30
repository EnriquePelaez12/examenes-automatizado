import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasPage } from './mas.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MasPageRoutingModule } from './mas-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MasPageRoutingModule,
  ],
  declarations: [MasPage]
})
export class MasPageModule {}
