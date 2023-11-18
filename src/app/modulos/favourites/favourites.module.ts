import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FavouritesPageComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FavouritesModule { }
