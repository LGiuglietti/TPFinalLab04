import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  movieList: Array<any> = [];

  constructor(private movieService: MoviesService){}

  ngOnInit(): void {
    this.movieService.getAll()
      .then(response => {
        
        console.log(response);

        /*
        this.movieList =  response.map(movie !: any => {
          id: movie.id

        })
        */
        this.movieList = response;
        //console.log(this.movieList);
        
        
        
        
      })
      .catch(error => {
        console.log(error);        
      })
  }
  
}
