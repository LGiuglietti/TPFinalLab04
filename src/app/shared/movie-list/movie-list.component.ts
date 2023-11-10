
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/core/Models';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  @Input() movieList: Movie[]=[];
  @Output() addDelete= new EventEmitter<string>()

  constructor(private movieService: MoviesService){}

  ngOnInit(): void {
  }
 

  onClick(id: string){
    this.addDelete.emit(id);
  }
}
  
