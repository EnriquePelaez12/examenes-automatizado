import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiPageRoutingModule } from './sui-routing.module';

import { SuiPage } from './sui.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiPageRoutingModule
  ],
  declarations: [SuiPage]
})
export class SuiPageModule {}
