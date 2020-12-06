import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeExamenPageRoutingModule } from './home-examen-routing.module';

import { HomeExamenPage } from './home-examen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeExamenPageRoutingModule
  ],
  declarations: [HomeExamenPage]
})
export class HomeExamenPageModule {}
