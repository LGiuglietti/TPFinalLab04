import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CommentPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommentsRoutingModule,
    SharedModule
  ]
})
export class CommentsModule { }
