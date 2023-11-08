import { Component, OnInit } from '@angular/core';
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

  public movieList: Array<Movie> = [];
  public auxIdList: Array<string> = [];

  constructor(private apiService: ApiService, private userService: UserService, private movieService: MoviesService) { }

  public user: User = new User()
  ngOnInit(): void {
     this.user= this.userService.getSessionUser();
    console.log(this.user)
    this.getFavourites()
  }
  async getFavourites() {
    const res = this.apiService.getFavourites(this.user.id);
    //console.log(res);
    res.subscribe(
      data => {
      //  console.log(data)
        this.auxIdList = data;
        this.getMoviesFromAux();
        console.log(this.auxIdList)
      })
     
    
  }

  async getMoviesFromAux() {
    for (let i = 0; i < this.auxIdList.length; i++) {
      const idMovie = this.auxIdList[i]
      console.log(idMovie);
      const res = await this.movieService.getById(idMovie); //busco por id
      this.movieList.push(res);

    }
  }

}
