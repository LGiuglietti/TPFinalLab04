import { Component, OnInit } from '@angular/core';
import { Movie, User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(private userService: UserService, private movieService: MoviesService, private apiService: ApiService) { }

  public movieList: Array<Movie> = [];
  public user: User = new User();
  ngOnInit(): void {
    this.user = this.userService.getSessionUser();
    console.log(this.user);
    this.movieService.getAllObservable().subscribe({
      next: (response) => this.movieList = response as Movie[],
      error(error) { console.log(error) },
      complete() { console.log("the movies are ready") }
    })
  }
  addFavourite(idPeli: string) {
    this.apiService.setFavourite(this.user.id, idPeli).subscribe({
      next: (response) => {
        if (response) {
          alert("Pelicula agregada");
        } else {
          alert("Pelicula ya en favoritos");
        }
      },
      error: (error) => {
        console.error("Error al procesar la solicitud: ", error);
        alert("Error al procesar la solicitud");
      }
    })
  }




}
