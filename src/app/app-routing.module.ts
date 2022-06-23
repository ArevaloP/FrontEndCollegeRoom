import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, CanActivate } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: ()=> import('./ecommerce/ecommerce.module').then(m=>m.EcommerceModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: 'profile',
    loadChildren: ()=> import('./user-profile/user-profile.module').then(m=>m.UserProfileModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
