import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, User, Comment } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { CommentsService } from 'src/app/core/services/comments.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})
export class CommentPageComponent implements OnInit {
  constructor(private commentService: CommentsService, private router: Router, private route: ActivatedRoute,
    private userService: UserService, private apiService: ApiService, private formbuilder: FormBuilder) { }

  movie = new Movie();
  user = new User();
  commentForm!: FormGroup;
  commentArray: Comment[] = [];


  ngOnInit(): void {
    this.initializeForm();
    this.movie = this.commentService.getPeli(); //traigo el objeto Movie
    this.user = this.userService.getSessionUser(); //traigo el objeto User
    this.getComments();
  }

  initializeForm(): void {
    this.commentForm = this.formbuilder.group({
      content: ['', Validators.required],
    });
  }

  addComment() {
    const contentControl = this.commentForm.get('content');
    if (contentControl && contentControl.value) {
      const content = contentControl.value;

      const newComment = new Comment(); //creo y cargo el comentario
      newComment.content = content;
      newComment.userName = this.user.userName;
      newComment.dateOfComment = new Date();

      console.log(newComment);

      this.apiService.setComment(this.movie.id, newComment).subscribe(() => { //seteo comentario
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.route.snapshot.url]);
      });
    }
  }

  public getComments() {
    console.log(this.movie.title);
    this.apiService.getComments(this.movie.id).subscribe({
      next: (comments) => {
        console.log(comments);
        this.commentArray = comments;
        console.log(comments);
      }
    })
  }


}
