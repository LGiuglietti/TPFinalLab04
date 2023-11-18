
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/Models';
import { CommentsService } from 'src/app/core/services/comments.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  @Input() movieList: Movie[]=[];
  @Input() buttonText: string = 'Default Text';
  
  @Output() addDelete= new EventEmitter<string>()

  constructor(private router: Router, private commentService: CommentsService){}

  ngOnInit(): void {
  }
 
  onClick(id: string){
    this.addDelete.emit(id);
  }
  commentClick(movie: Movie)
  {
    this.commentService.setIdPeli(movie);
    this.router.navigate(["comments"])
  }
}
  
