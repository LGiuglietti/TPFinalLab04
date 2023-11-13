import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Error404Component } from './error404/error404.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    Error404Component,
    MovieListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    Error404Component,
    MovieListComponent
  ]
})
export class SharedModule { }
