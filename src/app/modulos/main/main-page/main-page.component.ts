import { Component, OnInit } from '@angular/core';
import { Movie, User } from 'src/app/core/Models';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  constructor(private userService: UserService, private movieService: MoviesService){}

  public movieList: Array<Movie>=[];

  ngOnInit(): void {
    const user=this.userService.getSessionUser();  
    console.log(user);
    this.movieService.getAllObservable().subscribe({
      next: (response) => this.movieList = response as Movie[],
      error(error){console.log(error)},
      complete() {console.log("the movies are ready")}
    })
  }
  


}
