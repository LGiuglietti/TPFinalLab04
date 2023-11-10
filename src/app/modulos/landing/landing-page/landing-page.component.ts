import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  movieListLanding: Array<any> = [];

  constructor( private router: Router, private movieService: MoviesService){}

  ngOnInit(): void {
    this.movieService.getAll()
      .then(response => {
    
        /*
        this.movieList =  response.map(movie !: any => {
          id: movie.id

        })
        */
        this.movieListLanding = response;
        //console.log(this.movieList);
      })
      .catch(error => {
        console.log(error);        
      })
  }

  public goToLogin(){
    
    this.router.navigate(["auth/login"]);
  }
  public goToRegister(){
    this.router.navigate(["auth/register"]);
  }
}
