import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.css']
})
export class FavouritesPageComponent implements OnInit {

  public movieListFavourite: Array<Movie> = [];
  public auxIdList: Array<string> = [];
  public buttonText: string = "Delete";
  public user: User = new User()


  constructor(private apiService: ApiService, private userService: UserService, private movieService: MoviesService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.userService.getSessionUser();
    if (this.user.userName != '') {
      this.getFavourites();
    }
    else {
      this.router.navigate(['landing']);
    }
  }

  async getFavourites() {
    const res = this.apiService.getFavourites(this.user.id);
    res.subscribe(
      data => {
        console.log(data);
        this.auxIdList = data;
        this.getMoviesFromAux();
      }

    )
  }

  async getMoviesFromAux() {
    for (let i = 0; i < this.auxIdList.length; i++) {
      const idMovie = this.auxIdList[i]
      const res = await this.movieService.getById(idMovie); //busco por id
      this.movieListFavourite.push(res);
    }
  }

  deleteFavorite(idPeli: string) {
    this.apiService.deleteFavourite(this.user.id, idPeli).subscribe({
      next: () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; //si bien no me gusta usar deprecados es la solucion mas sencilla 
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.route.snapshot.url]);
      },
      error: () => {
        console.log("error");
      }
    })
  }
}
