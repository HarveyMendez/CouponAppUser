import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cupon',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cupon',
    loadChildren: () => import('./cupon/cupon.module').then( m => m.CuponPageModule)
  },
  {
    path: 'info-cupon/:id',
    loadChildren: () => import('./info-cupon/info-cupon.module').then( m => m.InfoCuponPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'pagar',
    loadChildren: () => import('./pagar/pagar.module').then( m => m.PagarPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
