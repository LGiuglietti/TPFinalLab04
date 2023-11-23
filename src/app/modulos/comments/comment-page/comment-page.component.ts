
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
    this.user = this.userService.getSessionUser(); //traigo el objeto User
    if(this.user.userName!=''){
    this.initializeForm();
    this.movie = this.commentService.getPeli(); //traigo el objeto Movie
    this.getComments();
  }
  else{
    this.router.navigate(['landing']);
  }
  }

  initializeForm(): void {
    this.commentForm = this.formbuilder.group({
      content: ['', Validators.required],
    });
  }

  addComment() {
    const contentControl = this.commentForm.get('content');
    if (contentControl && contentControl.value) {
      const content: string = contentControl.value;
      if (content.trim() !== '') {
        const newComment = new Comment(); //creo y cargo el comentario
        newComment.content = content;
        newComment.userName = this.user.userName;

        newComment.dateOfComment = this.getFormattedDate(); //creo el date actual a un formato leible

        console.log(newComment);

        this.apiService.setComment(this.movie.id, newComment).subscribe(() => { //seteo comentario
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.route.snapshot.url]);
        });
      }
      else{
        //trata de enviar un mensage con solo espacios
      }
    }else{
      //trata de enviar algo vacio
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

  getFormattedDate(): string { //en esta funcion basicamente se separan los pedazos de string que nos sirven del objeto date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`; //se retornan en un string
  }



}
