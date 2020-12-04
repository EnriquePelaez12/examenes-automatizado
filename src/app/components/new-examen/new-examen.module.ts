import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExamenPageRoutingModule } from './new-examen-routing.module';

import { NewExamenPage } from './new-examen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExamenPageRoutingModule
  ],
  declarations: [NewExamenPage]
})
export class NewExamenPageModule {}
