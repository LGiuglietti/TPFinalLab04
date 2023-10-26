import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from './modulos/landing/landing.module';
import { Error404Component } from './shared/error404/error404.component';
import { LandingPageComponent } from './modulos/landing/landing-page/landing-page.component';
import { MovieListComponent } from './shared/movie-list/movie-list.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    loadChildren: () => import("./modulos/landing/landing.module").then(m => m.LandingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import("./modulos/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import("./modulos/main/main.module").then(m => m.MainModule)
  },
  {
    path: '', 
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MovieListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
