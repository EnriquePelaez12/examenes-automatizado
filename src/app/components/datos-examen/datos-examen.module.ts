import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosExamenPageRoutingModule } from './datos-examen-routing.module';

import { DatosExamenPage } from './datos-examen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosExamenPageRoutingModule
  ],
  declarations: [DatosExamenPage]
})
export class DatosExamenPageModule {}
