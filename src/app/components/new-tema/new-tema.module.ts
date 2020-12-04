import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTemaPageRoutingModule } from './new-tema-routing.module';

import { NewTemaPage } from './new-tema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTemaPageRoutingModule
  ],
  declarations: [NewTemaPage]
})
export class NewTemaPageModule {}
