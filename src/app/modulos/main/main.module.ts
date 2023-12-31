import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
