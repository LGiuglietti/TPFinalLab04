import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingModule } from './modulos/landing/landing.module';
import { Error404Component } from './shared/error404/error404.component';
import { LandingPageComponent } from './modulos/landing/landing-page/landing-page.component';
import { MovieListComponent } from './shared/movie-list/movie-list.component';
import { CommentPageComponent } from './modulos/comments/comment-page/comment-page.component';
import { AuthGuard } from './guards/auth-guards';
import { LoginGuard } from './guards/login-guards';

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
    loadChildren: () => import("./modulos/main/main.module").then(m => m.MainModule) // , canActivate: [LoginGuard]
  },
  {
    path: 'favourite',
    loadChildren: () => import("./modulos/favourites/favourites.module").then(m => m.FavouritesModule) // , canActivate: [AuthGuard]
  },
  {
    path: 'comments',
    component: CommentPageComponent //, canActivate: [AuthGuard]
  },
  {
    path: '', 
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MovieListComponent //, canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
