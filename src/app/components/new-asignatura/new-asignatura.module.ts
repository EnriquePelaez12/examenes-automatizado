import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAsignaturaPageRoutingModule } from './new-asignatura-routing.module';

import { NewAsignaturaPage } from './new-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAsignaturaPageRoutingModule
  ],
  declarations: [NewAsignaturaPage]
})
export class NewAsignaturaPageModule {}
