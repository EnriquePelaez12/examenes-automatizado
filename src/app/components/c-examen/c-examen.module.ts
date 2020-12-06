import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CExamenPageRoutingModule } from './c-examen-routing.module';

import { CExamenPage } from './c-examen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CExamenPageRoutingModule
  ],
  declarations: [CExamenPage]
})
export class CExamenPageModule {}
