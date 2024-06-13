import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCuponPageRoutingModule } from './info-cupon-routing.module';

import { InfoCuponPage } from './info-cupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoCuponPageRoutingModule
  ],
  declarations: [InfoCuponPage]
})
export class InfoCuponPageModule {}
