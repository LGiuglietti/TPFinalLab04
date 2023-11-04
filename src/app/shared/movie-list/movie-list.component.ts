import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  movieList = new Array<Movie>();

  constructor(private movieService: MoviesService){}

  ngOnInit(): void {
    /*
    this.movieService.getAll()
      .then(response => {
        console.log(response);
        this.movieList = response;
        
      })
      .catch(error => {
        console.log(error);        
      })
    */

    this.movieService.getAllObservable().subscribe({
      next: (response) => this.movieList = response as Movie[],
      error(error){console.log(error)},
      complete() {console.log("the movies are ready")}
    })
  }

}
