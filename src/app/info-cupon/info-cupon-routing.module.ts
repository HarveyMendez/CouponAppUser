import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoCuponPage } from './info-cupon.page';

const routes: Routes = [
  {
    path: '',
    component: InfoCuponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoCuponPageRoutingModule {}
